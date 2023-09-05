'use client'

import { useState } from 'react'

type TRadioProps = {
  title: string
  options: Array<{
    value: string
    label: string
  }>
  defaultValue?: string
  onChange: (value: string) => void
}

export default function Radio({ title, options, defaultValue, onChange }: TRadioProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const normalizedTitle = title.toLowerCase().replaceAll(' ', '-')
  const getUniqueId = (value: string) => `${normalizedTitle}-${value}`

  const handleChange = (value: string) => {
    setSelectedValue(value)
    onChange(value)
  }

  return (
    <>
      <h3 className="mb-1 font-semibold text-white text-center">{title}</h3>
      <ul className="w-48 text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">
        {options.map(({ value, label }) => (
          <li className="w-full border-b rounded-t-lg border-gray-600" key={value}>
            <div className="flex items-center pl-3">
              <input
                id={getUniqueId(value)}
                type="radio"
                value={value}
                onChange={() => handleChange(value)}
                checked={selectedValue === value}
                name={`radio-list-${normalizedTitle}`}
                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
              />
              <label htmlFor={getUniqueId(value)} className="w-full py-3 ml-2 text-sm font-medium text-gray-300">
                {label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
