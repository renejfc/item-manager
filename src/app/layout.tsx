import './globals.css'
import type { Metadata } from 'next'
import SearchBar from '~/components/SearchBar'
import FavoritesModal from '~/components/FavoritesModal'
import ControlsDrawer from '~/components/ControlsDrawer'

export const metadata: Metadata = {
  title: 'Item Manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-zinc-200 pt-6 pb-20">
        <FavoritesModal />
        <ControlsDrawer />
        <div className="flex flex-col gap-10">
          <SearchBar />
          <div className="flex flex-col items-center w-full">{children}</div>
        </div>
      </body>
    </html>
  )
}
