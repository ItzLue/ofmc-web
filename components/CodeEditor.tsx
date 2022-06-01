import React, { useState } from 'react'
import { NextPage } from 'next'
import Editor from '@monaco-editor/react'
import { AiOutlineReload } from 'react-icons/ai'

type IProps = {
    code: string
    onChange: (value: string) => void
    onSubmit: () => void
}

const CodeEditor: NextPage<IProps> = ({ code, onChange, onSubmit }) => {
    return (
        <div className="w-full h-full">
            <div className="flex flex-row-reverse bg-gray-800 w-full gap-4 h-8 rounded-tl-lg rounded-tr-lg items-center overflow-y-hidden text-white">
                <button className="p-2 bg-blue-700 rounded-tr-lg" type="button" onClick={onSubmit}>
                    Run code
                </button>
                <AiOutlineReload className="h-4 w-4 hover:cursor-pointer" />
            </div>
            <Editor
                theme="vs-dark"
                value={code}
                height="100%"
                onChange={(value) => onChange(value || '')}
                options={{
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 14,
                    wordWrap: 'on',
                }}
            />
        </div>
    )
}

export default CodeEditor
