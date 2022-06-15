import type { NextApiRequest, NextApiResponse } from 'next'
import { child, get, getDatabase, ref, set } from '@firebase/database'
import { v4 as uuidv4 } from 'uuid'
import { IProtocol } from '@/types/protocol'


const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id } = req.query

        if (id) {
            let protocol: IProtocol
            const db = getDatabase()
            const protocolRef = ref(db, `protocols/${id}`)
            get(protocolRef)
                .then((snapshot) => {
                    protocol = snapshot.val()
                })
                .catch((error) => {
                    console.log(error)
                })

            const newID = uuidv4().toString()
            get(child(ref(db), `public/${newID}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('Protocol already exists')
                } else {
                    set(ref(db, `public/${newID}`), {
                        name: protocol.name,
                        urlSlug: protocol.urlSlug,
                        type: protocol.type,
                        isComplete: protocol.isComplete ?? false,
                        userCode: protocol.userCode || protocol.startingCode,
                        isPublic: true,
                    }).then(() => res.status(201).json({ message: 'Protocol published' }))
                        .catch((e) => console.log(e))
                }
            })
        } else return res.status(500).json({ message: 'Method not allowed' })
    }
}
export default handler
