import React from 'react'

export type ITab = {
    label: string
    key: string
    disabled?: boolean
    content?: React.ReactNode
}
