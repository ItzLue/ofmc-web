import { NextApiRequest, NextApiResponse } from 'next'
import { get, getDatabase, ref } from '@firebase/database'
import { IProtocol } from '@/types/protocol'

export enum EProtocolType {
    SYMKEYNOTTP,
    AUTHCFF,
    SYMKEYTPP,
    PUBKEYNOTTP,
    PUBKEYTPP,
    CLASSIC,
    USERCREATED
}

export const getProtocolName = (protocol: EProtocolType) => {
    const map = new Map<EProtocolType, string>([
        [EProtocolType.SYMKEYNOTTP, 'SymKeyNoTTP'],
        [EProtocolType.AUTHCFF, 'AuthCFF'],
        [EProtocolType.SYMKEYTPP, 'SymKeyTTP'],
        [EProtocolType.PUBKEYNOTTP, 'PubKeyNoTTP'],
        [EProtocolType.PUBKEYTPP, 'PubKeyTTP'],
        [EProtocolType.CLASSIC, 'Classic'],
        [EProtocolType.USERCREATED, 'UserCreated'],
    ])
    return map.get(protocol)
}


const getAllTemplates = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const db = getDatabase()
        const templateRef = ref(db, 'templates')
        return get(templateRef).then((snapshot) => {
            const templates: IProtocol[] = snapshot.val()
            const result: IProtocol[] = []
            for (let i in templates) {
                result.push({ ...templates[i], uid: i })
            }
            console.log(templates)
            return res.status(200).json({ protocols: result })
        })
    }
}

export default getAllTemplates
