'use server'

import { normalizeString } from '~/lib/utils'
import type { TItem, TSearchParams } from '~/types'

export async function fetchItems({ page, per_page, filter_by, filter_value, sort_by, sort_order }: TSearchParams) {
  const isPaginated = page && per_page
  const isFiltered = filter_by && filter_value

  try {
    const res = await fetch('https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json')
    const { items } = await res.json()

    const filteredItems = isFiltered
      ? getFilteredItems({
        items,
        filter_by,
        filter_value,
      })
      : null

    if (!isPaginated) {
      return {
        items: filteredItems ?? (items as TItem[]),
        maxPage: 1,
      }
    }

    const sortedItems = getSortedItems({
      items: filteredItems ?? items,
      sort_by,
      sort_order,
    })

    const { paginatedItems, maxPage } = getPagination({
      items: sortedItems,
      page,
      per_page,
    })

    return {
      items: paginatedItems,
      maxPage,
    }
  }
  catch (error) {
    console.error('Error fetching items:', error)
    throw new Error('Error fetching items')
  }
}

function getPagination({ items, page, per_page }: { items: TItem[]; page: number; per_page: number }) {
  const maxPage = Math.ceil(items.length / per_page)

  if (page > maxPage) {
    return {
      paginatedItems: [],
      maxPage,
    }
  }

  const startIndex = (page - 1) * per_page
  const endIndex = page * per_page

  const paginatedItems = items.slice(startIndex, endIndex)

  return {
    paginatedItems,
    maxPage,
  }
}

function getFilteredItems({ items, filter_by, filter_value }: Pick<TSearchParams, 'filter_by' | 'filter_value'> & { items: TItem[] }) {
  const filterWords = normalizeString(filter_value).split(' ')

  return [...items].filter((item: TItem) => {
    const itemValue = normalizeString(item[filter_by])
    return filterWords.some(word => itemValue.includes(word))
  })
}

function getSortedItems({ items, sort_by, sort_order }: Pick<TSearchParams, 'sort_by' | 'sort_order'> & { items: TItem[] }) {
  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[sort_by]
    const bValue = b[sort_by]

    if (aValue < bValue)
      return sort_order === 'ascendant' ? -1 : 1

    if (aValue > bValue)
      return sort_order === 'ascendant' ? 1 : -1

    return 0
  })

  return sortedItems
}
