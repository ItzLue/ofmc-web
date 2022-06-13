import { atom } from 'recoil'
import { IProtocol } from '@/types/protocol'

const protocolState = atom<IProtocol | null>({
    key: 'protocolState',
    default: null,
})

export default protocolState
