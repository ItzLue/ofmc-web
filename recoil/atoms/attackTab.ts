import { atom } from 'recoil'

const attackTabState = atom<string>({
    key: 'attackTabState',
    default: "1",
})

export default attackTabState
