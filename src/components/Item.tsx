'use client'

import { useEffect, useState } from 'react'
import Star from '~/components/ui/icons/Star'
import { useFavoritesStore } from '~/lib/store/FavoritesStore'
import type { TItem } from '~/types'

export function Item({ description, email, image, price, title }: TItem) {
  const [favorites, toggleFavorite] = useFavoritesStore(state => [state.favorites, state.toggleFavorite])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.title === title))
  }, [favorites])

  return (
    <li>
      <article className="flex flex-col gap-5 max-w-sm h-[40rem] rounded overflow-hidden shadow-lg border border-slate-300 bg-gray-800 text-white pb-3">
        <img className="w-full aspect-square object-cover" src={image} alt={title} />
        <section className="flex flex-grow flex-col gap-2 px-3">
          <h1 className="font-bold text-xl">{title}</h1>
          <p className="text-gray-300 text-base line-clamp-4">{description}</p>
        </section>
        <footer className="flex gap-1 px-3">
          <span className="bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300">{price}€</span>
          <span className="bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300">{email}</span>
          <button onClick={() => toggleFavorite({ description, email, image, price, title })} className="ml-auto">
            <Star className={`h-7 w-7  cursor-pointer hover:fill-yellow-600 ${isFavorite && 'fill-yellow-600'}`} />
          </button>
        </footer>
      </article>
    </li>
  )
}
