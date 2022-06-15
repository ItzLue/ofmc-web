import { NextApiRequest, NextApiResponse } from 'next'
import { get, getDatabase, ref } from '@firebase/database'
import { IProtocol } from '@/types/protocol'


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
            return res.status(200).json({ protocols: result })
        })
    }
}

export default getAllTemplates
