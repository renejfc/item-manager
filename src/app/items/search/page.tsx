'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Spinner from '~/components/ui/Spinner'
import { ItemList } from '~/components/ItemList'
import { fetchItems } from '~/actions/fetch-items'
import type { TItem, TSearchParams } from '~/types'
import { useSearchStore } from '~/lib/store/SearchStore'
import { Item } from '~/components/Item'

export default function SearchPage() {
  const router = useRouter()
  const routerSearchParams = useSearchParams()
  const { ref, inView } = useInView()

  const [searchParams, setSearchParams] = useSearchStore(state => [state.searchParams, state.setSearchParams])
  const { page, per_page, filter_by, filter_value, sort_by, sort_order } = searchParams

  const [itemList, setItemList] = useState<TItem[]>([])
  const [remotePendingPages, setRemotePendingPages] = useState<boolean>(true)
  const isItemListEmpty = itemList.length === 0

  const requiredUrlSearchParams: (keyof TSearchParams)[] = ['filter_by', 'filter_value', 'sort_by', 'sort_order']
  const isUrlSearchParamsEmpty = requiredUrlSearchParams.some(key => !routerSearchParams.has(key))
  const urlAndStoreSearchParamsAreEqual = requiredUrlSearchParams.every(key => routerSearchParams.get(key) === searchParams[key])

  useEffect(() => {
    if (isUrlSearchParamsEmpty)
      router.replace('/')

    if (!urlAndStoreSearchParamsAreEqual) {
      setSearchParams(
        Object.fromEntries(
          requiredUrlSearchParams.map(key => [key, decodeURIComponent(routerSearchParams.get(key)!)]),
        ),
      )
    }
  }, [routerSearchParams])

  useEffect(() => {
    setRemotePendingPages(true)
    const getItems = async () => {
      const { items, maxPage } = await fetchItems({
        page,
        per_page,
        filter_by,
        filter_value,
        sort_by,
        sort_order,
      })

      items && setItemList(items)

      if (page + 1 >= maxPage)
        setRemotePendingPages(false)
    }

    getItems()
  }, [filter_by, filter_value, sort_by, sort_order])

  useEffect(() => {
    const loadMoreItems = async () => {
      const { items, maxPage } = await fetchItems({
        page: page + 1,
        per_page,
        filter_by,
        filter_value,
        sort_by,
        sort_order,
      })

      setSearchParams({ page: page + 1 })
      setItemList(prevItems => [...prevItems, ...items])

      if (page + 1 >= maxPage)
        setRemotePendingPages(false)
    }

    if (inView && remotePendingPages)
      loadMoreItems()
  }, [inView])

  return (
    <div>
      {isItemListEmpty
        ? (
        <p className="text-center text-2xl text-white">No items found!</p>
          )
        : (
        <>
          <ItemList>
            {itemList.map(item => (
              <Item key={item.title} {...item} />
            ))}
          </ItemList>
          <div className="flex justify-center items-center mt-4 mb-16" ref={ref}>
            {remotePendingPages && <Spinner />}
          </div>
        </>
          )}
    </div>
  )
}
