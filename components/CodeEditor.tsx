import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import Editor from '@monaco-editor/react'
import { FiUpload, FiDownload, FiSettings } from 'react-icons/fi'
import { VisuallyHidden } from 'react-aria'
import OfmcSettingsModal from '@/components/Modals/OfmcSettingsModal'
import { Monaco } from '@monaco-editor/loader'
import { BiEdit } from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'
import { ImCheckmark, ImCross } from 'react-icons/im'
import axios from 'axios'
import Button from '@/components/Button'

type IProps = {
    code: string
    onChange: (value: string) => void
    onSubmit: () => void
    protocolName: string
    protocolId: string
    showNoUserModal: () => void
    isLoading: boolean
}

const CodeEditor: NextPage<IProps> = ({
                                          code,
                                          onChange,
                                          onSubmit,
                                          protocolName,
                                          protocolId,
                                          showNoUserModal,
                                          isLoading,
                                      }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [user] = useAuthState(auth)
    const uploadRef = useRef(null)
    const [changeName, setChangeName] = useState(false)
    const [name, setName] = useState(protocolName)

    useEffect(() => {
        setName(protocolName)
    }, [protocolName])

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
        link.download = protocolName + '.AnB'
        link.click()
    }

    const setupAnB = (monaco: Monaco) => {
        monaco.languages.register({ id: 'AnB' })
        // Register a tokens provider for the language
        monaco.languages.setMonarchTokensProvider('AnB', {
            tokenizer: {
                root: [
                    [
                        /\b(Protocol|Types|Agent|Number|Function|Symmetric_key|PublicKey|Knowledge|where|Actions|Goals|authenticates|on|secrecy|of|secret|between)\b(:?)/g,
                        'keywords',
                    ],
                    //[/[a-zA-Z]\w*|\d/, 'constants'],
                    [/(exp|inv|hash)/g, 'builtinfunctions'],
                    [/\\b[A-Z_][a-zA-Z0-9_]*/g, 'constantsNumerics'],
                    [/#.+$/g, 'comments'],
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
                { token: 'comments', foreground: '#808080' },
            ],
            colors: {
                'editor.foreground': '#ffffff',
            },
        })
    }

    const onChangeName = () => {
        axios.patch(`/api/protocols/${protocolId}`, { name: name }).then(() => {
            setChangeName(false)
        })
    }

    return (
        <div className='w-1/2 h-full'>
            <div
                className='flex justify-between bg-gray-800 w-full gap-4 h-8 rounded-tl-lg rounded-tr-lg items-center overflow-y-hidden text-white'>
                <div className='inline-flex gap-2 ml-4 items-center'>
                    {user && changeName ? (
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='bg-vs-code text-white'
                        />
                    ) : (
                        <span>{name}</span>
                    )}
                    {user && !changeName ? (
                        <BiEdit
                            cy-data='change-name'
                            className='text-white h-4 w-4 cursor-pointer'
                            onClick={() => setChangeName(!changeName)}
                        />
                    ) : (
                        <ImCross
                            cy-data='cancel-change-name'
                            className={`text-red-700 h-4 w-4 cursor-pointer ${!user && 'hidden'}`}
                            onClick={() => setChangeName(!changeName)}
                        />
                    )}
                    {user && changeName && (
                        <ImCheckmark
                            cy-data='accept-change-name'
                            className='text-green-500 h-4 w-4 cursor-pointer'
                            onClick={onChangeName}
                        />
                    )}
                </div>
                <div className='flex flex-row-reverse items-center gap-4'>
                    <Button
                        cy-data='run-code-button'
                        className='p-2 bg-blue-700 rounded-tr-lg hover:bg-blue-900'
                        type='button'
                        onClick={user ? onSubmit : showNoUserModal}
                        loading={isLoading}
                    >
                        Run code
                    </Button>
                    <div>
                        <VisuallyHidden
                            className='relative border border-solid border-grey-lightest w-full rounded-3xl pb-full box-content'>
                            <input
                                disabled={!user}
                                type='file'
                                id='file'
                                accept='.AnB'
                                onChange={handleFileUpload}
                                ref={uploadRef}
                            />
                        </VisuallyHidden>
                        <label htmlFor='file' className='cursor-pointer'>
                            <FiUpload
                                cy-data='upload-button'
                                className='h-4 w-4'
                                onClick={() => !user && showNoUserModal()}
                            />
                        </label>
                    </div>
                    <FiDownload cy-data='download-button'
                                className='h-4 w-4 cursor-pointer' onClick={handleFileDownload} />
                    <FiSettings
                        cy-data='settings-button'
                        onClick={() => {
                            if (!user) {
                                showNoUserModal()
                            } else {
                                setIsSettingsOpen(true)
                            }
                        }}
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
                    readOnly: !user,
                }}
                beforeMount={setupAnB}
            />
            <OfmcSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
    )
}

export default CodeEditor
