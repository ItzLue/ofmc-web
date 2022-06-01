import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

const handleUpload = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        fs.writeFile(`./ofmc/user-created/${Date.now()}.AnB`, req.body.toString(), (err) => {
            if (err) {
                return res.status(500).json({ message: err.toString() })
            }
            return res.status(200).json({ message: 'Success' })
        })
    } else {
        return res.status(500).json({ message: 'Method not allowed' })
    }
}

export default handleUpload
