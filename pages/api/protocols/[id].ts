import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase, onValue, ref, remove } from '@firebase/database'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = getDatabase()
    if (req.method === 'GET') {
        const { id, template } = req.query

        if (id && !template) {
            const protocolRef = ref(db, `protocols/${id}`)
            return onValue(
                protocolRef,
                (snapshot) => {
                    return res.status(200).json({
                        protocol: snapshot.val(),
                    })
                },
                { onlyOnce: true },
            )
        }
        if (id && template) {
            const templateRef = ref(db, `templates/${id}`)
            return onValue(
                templateRef,
                (snapshot) => {
                    return res.status(200).json({
                        protocol: snapshot.val(),
                    })
                },
                { onlyOnce: true },
            )
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query

        const protocolRef = ref(db, `protocols/${id}`)
        await remove(protocolRef)
            .then(() => {
                return res.status(200).json({ message: 'Protocol deleted' })
            })
            .catch(() => res.status(500).json({ message: 'Error deleting protocol' }))
    } else {
        return res.status(500).json({ message: 'Method not allowed' })
    }
}

export default handle
