'use client'

import { useEffect, useState } from 'react'
import { useFavoritesStore } from '~/lib/store/FavoritesStore'
import type { TItem } from '~/types'
import Star from '~/components/ui/icons/Star'

export function FavoriteItem({ title, image, description, email, price }: TItem) {
  const [favorites, toggleFavorite] = useFavoritesStore(state => [state.favorites, state.toggleFavorite])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.title === title))
  }, [favorites])

  return (
    <li>
      <article className="flex flex-col gap-5 max-w-sm rounded overflow-hidden shadow-lg border border-slate-300 bg-gray-800 text-white pb-3">
        <img className="w-full aspect-square object-cover" src={image} alt={title} />
        <footer className="flex justify-between px-5">
          <h1 className="font-bold text-xl">{title}</h1>
          <button onClick={() => toggleFavorite({ description, email, image, price, title })}>
            <Star className={`h-7 w-7  cursor-pointer hover:fill-yellow-600 ${isFavorite && 'fill-yellow-600'}`} />
          </button>
        </footer>
      </article>
    </li>
  )
}
