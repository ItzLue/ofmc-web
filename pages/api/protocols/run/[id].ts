import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { get, getDatabase, ref } from '@firebase/database'
import parseOfmcOutput from '../../../../helpers/server/parseOfmcOutput'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id } = req.query

        if (id) {
            let protocol
            const db = getDatabase()
            const protocolRef = ref(db, `protocols/c65c121c-aec9-4ea7-b282-83a73a07fe2c`)
            get(protocolRef)
                .then((snapshot) => {
                    protocol = snapshot.val()
                })
                .catch((error) => {
                    console.log(error)
                })

            console.log(protocol)
            /*
fs.writeFile(`./ofmc/user-created/${Date.now()}.AnB`, req.body.code, (err) => {
    if (err) {
        return res.status(500).json({ message: err.toString() })
    }
    return res.status(200).json({ message: 'Success' })
})
 */

            const log = fs.readFileSync('ofmc/examples/classic/log/PKINIT.log', {
                encoding: 'utf8',
            })

            const parsed = parseOfmcOutput(log)

            return res.status(200).json({ parsed, raw: log })
        }
    } else return res.status(500).json({ message: 'Method not allowed' })
}

export default handler
