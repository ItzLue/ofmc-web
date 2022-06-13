import React, { useRef, useState } from 'react'
import { NextPage } from 'next'
import Editor from '@monaco-editor/react'
import { FiUpload, FiDownload, FiSettings } from 'react-icons/fi'
import { VisuallyHidden } from 'react-aria'
import OfmcSettingsModal from '@/components/Modals/OfmcSettingsModal'
import { Monaco } from '@monaco-editor/loader'

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

    const handleFileDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'code.AnB'
        link.click()
    }

    const setupAnB = (monaco: Monaco) => {
        monaco.languages.register({ id: 'AnB' })

        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider('AnB', {
            tokenizer: {
                root: [
                    [/(Protocol|Types|Agent|Number|Function|Symmetric_key|PublicKey|Knowledge|where|Actions|Goals|authenticates|on|secrecy|of|secret|between)(:?)/g, 'keywords',],
                    //[/[a-zA-Z]\w*|\d/, 'constants'],
                    [/(exp|inv|hash)/g, 'builtinfunctions'],
                    [/\\b[A-Z_][a-zA-Z0-9_]*/g, 'constantsNumerics'],
                    [/->/g, 'arrow'],
                ],
            },
        })

        // Define a new theme that contains only rules that match this language
        monaco.editor.defineTheme('AnBTheme', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'keywords', foreground: '#4BE15C14' },
                { token: 'constants', foreground: 'ff0000', fontStyle: 'bold' },
                { token: 'builtinfunctions', foreground: 'FFA500' },
                { token: 'constantsNumerics', foreground: '008800' },
                { token: 'arrow', foreground: '#FF000014' },
            ],
            colors: {
                'editor.foreground': '#ffffff',
            },
        })
    }

    return (
        <div className='w-full h-full'>
            <div
                className='flex justify-between bg-gray-800 w-full gap-4 h-8 rounded-tl-lg rounded-tr-lg items-center overflow-y-hidden text-white'>
                <div className='ml-4'>
                    <span>Name of protocol</span>
                </div>
                <div className='flex flex-row-reverse items-center gap-4'>
                    <button
                        className='p-2 bg-blue-700 rounded-tr-lg'
                        type='button'
                        onClick={onSubmit}
                    >
                        Run code
                    </button>
                    <div>
                        <VisuallyHidden
                            className='relative border border-solid border-grey-lightest w-full rounded-3xl pb-full box-content'>
                            <input
                                type='file'
                                id='file'
                                accept='.AnB'
                                onChange={handleFileUpload}
                                ref={uploadRef}
                            />
                        </VisuallyHidden>
                        <label htmlFor='file' className='cursor-pointer'>
                            <FiUpload className='h-4 w-4' />
                        </label>
                    </div>
                    <FiDownload className='h-4 w-4' onClick={handleFileDownload} />
                    <FiSettings
                        onClick={() => setIsSettingsOpen(true)}
                        className='w-4 h-4 cursor-pointer'
                    />
                </div>
            </div>
            <Editor
                theme='AnBTheme'
                value={code}
                height='100%'
                language='AnB'
                onChange={(value) => onChange(value || '')}
                options={{
                    minimap: {
                        enabled: false,
                    },
                    fontSize: 14,
                    wordWrap: 'on',
                }}
                beforeMount={setupAnB}
            />
            <OfmcSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    )
}

export default CodeEditor
