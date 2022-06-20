import { atom } from 'recoil'

const selectedProtocolTab = atom<number>({
    key: 'selectedProtocolTab',
    default: 0,
})

export default selectedProtocolTab

