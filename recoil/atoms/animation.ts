import { atom } from 'recoil'

const animateSvgState = atom<boolean>({
    key: 'animateSvgState',
    default: true,
})

export default animateSvgState
