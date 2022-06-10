import { atom } from 'recoil'
import { IOFMCSettings } from '@/components/Modals/OfmcSettingsModal'

const ofmcSettingsState = atom<IOFMCSettings | undefined>({
    key: 'ofmcSettings',
    default: undefined,
})

export default ofmcSettingsState
