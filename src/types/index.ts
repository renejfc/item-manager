export type TItem = {
  title: string
  image: string
  price: string
  email: string
  description: string
}

export type TAllowedFilters = keyof Omit<TItem, 'image'>
export type TSortDirection = 'ascendant' | 'descendant'

export type TSearchParams = {
  page: number
  per_page: number
  filter_by: TAllowedFilters
  filter_value: string
  sort_by: TAllowedFilters
  sort_order: TSortDirection
}
