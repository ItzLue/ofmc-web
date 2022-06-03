import { atom } from 'recoil'
import { IProtocol } from '../../types/protocol'


export const protocolState = atom<IProtocol | null>({
    key: 'protocolState',
    default: null,
})
