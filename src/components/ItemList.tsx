export function ItemList({ children }: { children: React.ReactNode[] }) {
  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
      {children}
    </ul>
  )
}
