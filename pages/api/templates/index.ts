import { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import { faker } from '@faker-js/faker'
import { IProtocol } from '../../../types/protocol'
import { readAllProtocols } from '../../../helpers/firebase/protocols/create-new-protocol'

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


export const protocols: IProtocol[] = faker.datatype.array((30)).map((_, index) => {
    const name = faker.name.firstName() + ' ' + faker.name.lastName()
    return {
        uid: index.toString(),
        name,
        downloadUrl: faker.internet.url(),
        urlSlug: faker.helpers.slugify(name),
        type: faker.datatype.number({ min: 0, max: 6 }),
        attackTraceUrl: faker.internet.url(),
        isComplete: faker.datatype.boolean(),
    }
})


const getAllTemplates = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            return res.status(200).json(protocols)
        } catch (err) {
            return res.status(500).json({ error: err })
        }
    }
}

export default getAllTemplates
