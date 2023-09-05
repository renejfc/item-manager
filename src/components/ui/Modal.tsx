import type { PropsWithChildren } from 'react'
import Cross from '~/components/ui/icons/Cross'

type TModalProps = {
  title: string
  open?: boolean
  closeControl?: () => void
  headerChildren?: React.ReactNode
}

export default function Modal({ title, children, open, closeControl, headerChildren }: PropsWithChildren<TModalProps>) {
  const close = () => closeControl && closeControl()
  return (
    <div
      id={`modal-${title}`}
      tabIndex={-1}
      className={`${open ? ' ' : 'hidden'} flex items-center justify-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-hidden md:inset-0 h-full max-h-full backdrop-blur-md`}
    >
      <div className="relative w-full max-w-7xl max-h-full overflow-y-auto">
        {/* <!-- Modal content --> */}
        <div className="relative rounded-lg shadow bg-gray-700">
          {/* <!-- Modal header --> */}
          <header className="flex items-center justify-between p-5 border-b rounded-t border-gray-600">
            <div>
              <h3 className="text-xl font-medium text-white sr-only lg:not-sr-only">{title}</h3>
            </div>
            {headerChildren && headerChildren}
            <div>
              <button
                onClick={close}
                className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              >
                <Cross />
                <span className="sr-only">close modal</span>
              </button>
            </div>
          </header>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
