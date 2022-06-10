import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase, onValue, ref } from '@firebase/database'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query
        if (id) {
            const db = getDatabase()
            const protocolRef = ref(db, `protocols/${id}`)
            return onValue(
                protocolRef,
                (snapshot) => {
                    return res.status(200).json({
                        protocol: snapshot.val(),
                    })
                },
                { onlyOnce: true }
            )
        }
    } else {
        return res.status(500).json({ message: 'Method not allowed' })
    }
}

export default handle
