import { create } from 'zustand'
import { normalizeString } from '../utils'
import type { TItem } from '~/types'

type FavoritesState = {
  favorites: TItem[]
  favoritesSearchQuery: string
  toggleFavorite: (item: TItem) => void
  setFavoritesSearchQuery: (searchQuery: string) => void
  filteredFavorites: () => TItem[]
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favorites: [],
  favoritesSearchQuery: '',
  toggleFavorite: item =>
    set(state => ({
      favorites: state.favorites.some(favorite => favorite.title === item.title)
        ? state.favorites.filter(favorite => favorite.title !== item.title)
        : [...state.favorites, item],
    })),
  setFavoritesSearchQuery: query => set({ favoritesSearchQuery: query }),
  filteredFavorites: () => get().favorites.filter((favorite) => {
    const normalizedTitle = normalizeString(favorite.title)
    const normalizedSearchQuery = normalizeString(get().favoritesSearchQuery)

    return normalizedTitle.includes(normalizedSearchQuery)
  }),
}))
