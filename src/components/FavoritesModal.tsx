'use client'

import Modal from '~/components/ui/Modal'
import Search from '~/components/ui/icons/Search'
import { ItemList } from '~/components/ItemList'
import { useFavoritesStore } from '~/lib/store/FavoritesStore'
import { useFavoritesModalStore } from '~/lib/store/ui/FavoritesModalStore'
import { FavoriteItem } from '~/components/FavoriteItem'

function FavoritesSearch() {
  const setFavoritesSearchQuery = useFavoritesStore(state => state.setFavoritesSearchQuery)
  return (
    <div className="flex gap-2 flex-1 justify-center">
      <div className="flex relative duration-300 w-full md:w-2/3 lg:w-2/4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search />
        </div>
        <input
          type="text"
          id="favorites-search-bar"
          placeholder="Search your favorite items! :)"
          required
          onChange={event => setFavoritesSearchQuery(event.target.value)}
          className="border text-base rounded-lg block w-full p-2.5 pl-10 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  )
}

export default function FavoritesModal() {
  const [isOpen, close] = useFavoritesModalStore(state => [state.isOpen, state.close])
  const [favorites, filteredFavorites] = useFavoritesStore(state => [state.favorites, state.filteredFavorites])

  return (
    <Modal title="Favorites" open={isOpen} closeControl={close} headerChildren={<FavoritesSearch />}>
      <ItemList>
        {(filteredFavorites() || favorites).map(item => (
          <FavoriteItem key={item.title} {...item} />
        ))}
      </ItemList>
    </Modal>
  )
}
