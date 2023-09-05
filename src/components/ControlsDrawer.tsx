'use client'
import Radio from '~/components/ui/Radio'
import Drawer from '~/components/ui/Drawer'
import Settings from '~/components/ui/icons/Settings'
import { useSearchStore } from '~/lib/store/SearchStore'
import { useControlsDrawerStore } from '~/lib/store/ui/ControlsDrawerStore'
import type { TAllowedFilters, TSortDirection } from '~/types'

export default function ControlsDrawer() {
  const [isOpen, close] = useControlsDrawerStore(state => [state.isOpen, state.close])
  const setSearchParams = useSearchStore(state => state.setSearchParams)

  const formatStr = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

  const allowedFilters: TAllowedFilters[] = ['title', 'price', 'email', 'description']
  const filterSortOptions = allowedFilters.map(filter => ({
    label: formatStr(filter),
    value: filter,
  }))

  const allowedSorts: TSortDirection[] = ['ascendant', 'descendant']
  const sortOrderOptions = allowedSorts.map(sort => ({
    label: formatStr(sort),
    value: sort,
  }))

  function handleFilterChange(filter_by: string) {
    setSearchParams({ filter_by: filter_by as TAllowedFilters })
  }

  function handleSortChange(sort_by: string) {
    setSearchParams({ sort_by: sort_by as TAllowedFilters })
  }

  function handleOrderChange(order: string) {
    setSearchParams({ sort_order: order as TSortDirection })
  }

  return (
    <Drawer title="Controls" open={isOpen} closeControl={close} icon={<Settings/>}>
      <ul className="flex flex-col gap-5 items-center md:gap-14">
        <li>
          <Radio title="Filter by" options={filterSortOptions} onChange={handleFilterChange} defaultValue="title" />
        </li>
        <li>
          <Radio title="Sort by" options={filterSortOptions} onChange={handleSortChange} defaultValue="title" />
        </li>
        <li>
          <Radio title="Order" options={sortOrderOptions} onChange={handleOrderChange} defaultValue="ascendant" />
        </li>
      </ul>
    </Drawer>
  )
}
