import React, { Fragment, useRef, useState } from 'react'
import { NextPage } from 'next'
import Editor from '@monaco-editor/react'
import { AiOutlineReload } from 'react-icons/ai'
import { FiUpload } from 'react-icons/fi'
import { VisuallyHidden } from 'react-aria'
import Modal from '@/components/Modal'

type IProps = {
    code: string
    onChange: (value: string) => void
    onSubmit: () => void
}

const CodeEditor: NextPage<IProps> = ({ code, onChange, onSubmit }) => {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const uploadRef = useRef(null)
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return
        const file = e.target.files[0]
        if (!file.name.includes('.AnB')) return
        const reader = new FileReader()
        reader.onload = async (e: any) => {
            onChange(e.target.result)

        }
        reader.readAsText(file)
    }

    return (
        <div className='w-full h-full'>
            <div
                className='flex flex-row-reverse bg-gray-800 w-full gap-4 h-8 rounded-tl-lg rounded-tr-lg items-center overflow-y-hidden text-white'>
                <button className='p-2 bg-blue-700 rounded-tr-lg' type='button' onClick={onSubmit}>
                    Run code
                </button>
                <AiOutlineReload className='h-4 w-4 hover:cursor-pointer' />
                <div>
                    <VisuallyHidden
                        className='relative border border-solid border-grey-lightest w-full rounded-3xl pb-full box-content'>
                        <input type='file' id='file' accept='.AnB' onChange={handleFileUpload} ref={uploadRef} />
                    </VisuallyHidden>
                    <label htmlFor='file' className='cursor-pointer'>
                        <FiUpload className='h-4 w-4' />
                    </label>
                </div>
                <button type='button' onClick={() => setIsSettingsOpen(true)}>Open settings</button>
            </div>
            <Editor
                theme='vs-dark'
                value={code}
                height='100%'
                onChange={(value) => onChange(value || '')}
                options={{
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 14,
                    wordWrap: 'on',
                }}
            />
            <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}/>
        </div>
    )
}

export default CodeEditor
