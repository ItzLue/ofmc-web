import { atom } from 'recoil'
import { IOFMCSettings } from '@/components/Modals/OfmcSettingsModal'

const ofmcSettingsState = atom<IOFMCSettings | undefined>({
    key: 'ofmcSettings',
    default: { numSess: 2, depth: 0 },
})

export default ofmcSettingsState
