type TSelectProps = {
  title: string
  options: Array<{
    value: string
    label: string
  }>
  placeholder?: string
}

export default function Select({ title, options, placeholder }: TSelectProps) {
  const normalizedTitle = title.split(' ').join('')
  return (
    <>
      <label htmlFor={normalizedTitle} className="block mb-2 text-sm font-bold">
        {title}
      </label>
      <select
        id={normalizedTitle}
        className="block bg-gray-50 p-2.5 border border-gray-300 text-zinc-900 text-sm rounded-lg w-full"
      >
        <option selected>{placeholder}</option>
        {options.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  )
}
