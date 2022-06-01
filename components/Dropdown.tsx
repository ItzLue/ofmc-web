import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

export type IOption = {
    id: number
    name: string
    label: string
    value: string
}

type IProps = {
    options: Array<IOption>
    defaultValue?: string
}

const Dropdown: React.FC<IProps> = ({ options, defaultValue = '' }) => {
    const [value, setValue] = useState(defaultValue)
    return (
        <div className="fixed top-16 w-72">
            <Listbox value={value} onChange={setValue}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{value}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            {value}
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {options.map((person) => (
                                <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                        >
                                            {value}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Dropdown
