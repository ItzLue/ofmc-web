import type { NextApiRequest, NextApiResponse } from 'next'
import * as shell from 'child_process'
import * as fs from 'fs'
import parseOfmcOutput from '../../helpers/server/parseOfmcOutput'
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: 'dacrsm3oo',
    api_key: '678678933786526',
    api_secret: '10RX0UtqyMfJZRxq8lze2jOdJ4Q',
})

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // const log = shell.execSync('ofmc ./ofmc/examples/classic/tls.AnB --numSess 2', {
        //   encoding: 'utf8',
        //})
        const log = fs.readFileSync('ofmc/examples/classic/log/PKINIT.log', {
            encoding: 'utf8',
        })

        cloudinary.uploader.upload('ofmc/examples/attacktrace.svg', (error, result) => {
            if (error) {
                console.error(error)
            }
        }).then(r => {
            return res.status(200).json({ parsed: parseOfmcOutput(log), raw: log, attackTraceUrl: r?.url})
        })
    }
}

export default handler
