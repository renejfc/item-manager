import { type PropsWithChildren } from 'react'
import Cross from '~/components/ui/icons/Cross'

type TDrawerProps = {
  title: string
  icon?: React.ReactElement
  open?: boolean
  closeControl?: () => void
}

export default function Drawer({ title, icon, open, closeControl, children }: PropsWithChildren<TDrawerProps>) {
  const close = () => closeControl && closeControl()
  return (
    <>
      <aside
        tabIndex={-1}
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-200 w-80 bg-gray-800 backdrop-blur-sm ${
          open ? '-translate-x-0' : '-translate-x-full'
        }`}
      >
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-400">
          {icon && (
            <span className="w-4 h-4 mr-2.5" aria-hidden="true">
              {icon}
            </span>
          )}
          {title}
        </h5>
        <button
          onClick={close}
          className="text-gray-400 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center hover:bg-gray-600 hover:text-white"
        >
          <Cross />
          <span className="sr-only">Close menu</span>
        </button>
        <div>{children}</div>
      </aside>
    </>
  )
}
