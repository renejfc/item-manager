'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Settings from '~/components/ui/icons/Settings'
import Search from '~/components/ui/icons/Search'
import Star from '~/components/ui/icons/Star'
import { useFavoritesModalStore } from '~/lib/store/ui/FavoritesModalStore'
import { useSearchStore } from '~/lib/store/SearchStore'
import { useControlsDrawerStore } from '~/lib/store/ui/ControlsDrawerStore'

export default function SearchBar() {
  const router = useRouter()
  const openControlsDrawer = useControlsDrawerStore(state => state.open)
  const openFavoritesModal = useFavoritesModalStore(state => state.open)

  const [searchQuery, setSearchQuery] = useState<string | null>()
  const [searchParams, setSearchParams] = useSearchStore(state => [state.searchParams, state.setSearchParams])
  const { filter_by, sort_by, sort_order } = searchParams

  function onSearch(event: React.FormEvent) {
    event.preventDefault()

    if (!searchQuery) {
      console.error('Not a valid search')
      return
    }

    setSearchParams({
      page: 1,
      filter_value: searchQuery,
    })

    const search = new URLSearchParams({
      filter_by,
      filter_value: encodeURIComponent(searchQuery),
      sort_by,
      sort_order,
    }).toString()

    router.push(`/items/search?${search}`)
  }

  return (
    <form
      onSubmit={onSearch}
      name="search-bar"
      className="w-full flex justify-center gap-2 flex-1 pb-10 fixed bottom-0 self-center duration-200 md:w-2/3 lg:w-2/5"
    >
      <label htmlFor="search-bar" className="sr-only">
        Search Bar
      </label>
      <div className="relative w-full">
        <button
          type="button"
          onClick={openControlsDrawer}
          className="absolute inset-y-0 p-2.5 text-sm font-medium h-full text-white rounded-l-lg border border-blue-700 focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          <Settings />
          <span className="sr-only">Settings</span>
        </button>
        <input
          type="text"
          id="search-bar"
          placeholder="What are you looking for?"
          required
          value={searchQuery || ''}
          onChange={event => setSearchQuery(event.target.value)}
          className="border text-base rounded-lg block w-full pl-12 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 font-medium h-full text-white rounded-r-lg border border-blue-700 focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        >
          <Search />
          <span className="sr-only">Search</span>
        </button>
      </div>
      <button
        type="button"
        onClick={openFavoritesModal}
        className="px-2.5 font-medium text-white rounded-lg border border-yellow-700 focus:ring-4 focus:outline-none bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-800"
      >
        <Star />
        <span className="sr-only">Favorites</span>
      </button>
    </form>
  )
}
