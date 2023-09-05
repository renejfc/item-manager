import { create } from 'zustand'
import type { TSearchParams } from '~/types'

type SearchState = {
  searchParams: TSearchParams
  setSearchParams: (params: Partial<TSearchParams>) => void
}

export const useSearchStore = create<SearchState>()(set => ({
  searchParams: {
    page: 1,
    per_page: 5,
    filter_by: 'title',
    filter_value: '',
    sort_by: 'title',
    sort_order: 'ascendant',
  },
  setSearchParams: params => set(state => ({ searchParams: { ...state.searchParams, ...params } })),
}))
