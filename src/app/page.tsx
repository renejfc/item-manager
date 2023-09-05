import DownArrow from '~/components/ui/icons/DownArrow'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-10 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
            Welcome to the Item Manager!
          </h1>
          <h2 className="text-xl font-extrabold tracking-tight leading-none md:text-2xl lg:text-3xl text-slate-300">
            The (sort of) search bar app.
          </h2>
        </header>
        <p className="text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-400">
          You can search for items, sort, filter and add them to favorites. Almost all the controls are accessible from
          the search bar down below.
        </p>
        <p className="inline-flex flex-col items-center gap-5 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 text-gray-400">
          Don&apos;t be shy, give it a try!
          <span className="animate-pulse">
            <DownArrow />
          </span>
        </p>
      </div>
    </main>
  )
}
