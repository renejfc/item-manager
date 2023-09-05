'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col gap-1 bg-red-100 p-5 rounded-md items-center">
      <h1 className="text-2xl font-bold text-red-700">Something went wrong!</h1>
      <p className="text-lg text-red-500">Go to the homepage and try again.</p>
      <Link href="/" className="flex gap-1 text-black pt-5 duration-200 uppercase hover:underline active:scale-95">
        <span className="animate-pulse">⬅️</span>
        Take me back
      </Link>
    </div>
  )
}
