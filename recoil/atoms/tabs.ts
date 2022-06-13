import { atom } from 'recoil'

const selectedTabState = atom<number>({
    key: 'selectedTabState',
    default: 0,
})

export default selectedTabState
