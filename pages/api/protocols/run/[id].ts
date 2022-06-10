import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import { get, getDatabase, ref } from '@firebase/database'
import parseOfmcOutput from '../../../../helpers/server/parseOfmcOutput'
import { execSync } from 'child_process'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id } = req.query
        const { code, settings } = req.body

        if (id) {
            let protocol
            const db = getDatabase()
            const protocolRef = ref(db, `protocols/${id}`)
            get(protocolRef)
                .then((snapshot) => {
                    protocol = snapshot.val()
                })
                .catch((error) => {
                    console.log(error)
                })

            console.log(protocol)

            fs.writeFile(`./ofmc/user-created/${id}.AnB`, code, (err) => {
                if (err) {
                    return res.status(500).json({ message: err.toString() })
                }
                /*
        const { numSess, depth } = settings
        const sessFlag = `--numSess ${numSess}`
        const depthFlag = `--depth ${depth}`

        execSync(
            `./ofmc/ofmc.sh ${numSess && sessFlag} ${
                depth && depthFlag
            } ${id}.AnB -o ${id}.out`
        )
         */

                execSync(
                    `ofmc ofmc/user-created/${id}.AnB --numSess 2 -o ofmc/user-created/${id}.log`
                )
                //  return res.status(200).json({ message: 'Success' })
            })

            const log = fs.readFileSync(`ofmc/user-created/${id}.log`, {
                encoding: 'utf8',
            })

            const parsed = parseOfmcOutput(log)

            execSync(`rm ofmc/user-created/${id}.AnB`)
            execSync(`rm ofmc/user-created/${id}.log`)

            return res.status(200).json({ parsed, raw: log })
        }
    } else return res.status(500).json({ message: 'Method not allowed' })
}

export default handler
