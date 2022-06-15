import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import { child, get, getDatabase, ref as dbref, update } from '@firebase/database'
import parseOfmcOutput from '../../../../helpers/server/parseOfmcOutput'
import { getDownloadURL, getStorage, ref } from '@firebase/storage'
import { uploadBytesResumable } from '@firebase/storage'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id } = req.query
        const { code, settings } = req.body

        if (id) {
            let protocol
            const db = getDatabase()
            const protocolRef = dbref(db, `protocols/${id}`)
            get(protocolRef)
                .then((snapshot) => {
                    protocol = snapshot.val()
                })
                .catch((error) => {
                    console.log(error)
                })

            fs.writeFile(`./ofmc/user-created/${id}.AnB`, code, (err) => {
                if (err) {
                    return res.status(500).json({ message: err.toString() })
                } else {
                    const log = fs.readFileSync(`ofmc/user-created/EPMO.log`, {
                        encoding: 'utf8',
                    })

                    const parsed = parseOfmcOutput(log)

                    if (!parsed.attackFound) {
                        update(child(dbref(db),`protocols/${id}`),{
                            isComplete: true
                        })
                    }

                    const storage = getStorage()
                    const svgRef = ref(storage, `svgs/9e161468-c6e4-42c5-b8f7-5b3614aa01f4.svg`) //change to /id
                    // Read svg files
                    fs.readFile('ofmc/user-created/9e161468-c6e4-42c5-b8f7-5b3614aa01f4.svg', (err, data) => {
                        if (err) res.status(400).json({ message: err })
                        const uploadTask = uploadBytesResumable(svgRef, data, { contentType: 'image/svg' })

                        uploadTask.on('state_changed',
                            (snapshot) => {
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                console.log('Upload is ' + progress + '% done')
                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused')
                                        break
                                    case 'running':
                                        console.log('Upload is running')
                                        break
                                }
                            },
                            (error) => {
                                console.log(error)
                            },
                            () => {
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    console.log('File available at', downloadURL)
                                    return res.status(200).json({ parsed, raw: log, svg: data.toString() })
                                })
                            },
                        )
                    })
                }
            })


            /*
    const { numSess, depth } = settings
    const sessFlag = `--numSess ${numSess}`
    const depthFlag = `--depth ${depth}`

    execSync(
        `./ofmc/ofmc.sh ${numSess && sessFlag} ${
            depth && depthFlag
        } ${id}.AnB -o ${id}.out`
    )


            execSync(
                `ofmc ofmc/user-created/${id}.AnB --numSess 2 -o ofmc/user-created/${id}.log`
            )
            //  return res.status(200).json({ message: 'Success' })
        })

        execSync(`rm ofmc/user-created/${id}.AnB`)
        execSync(`rm ofmc/user-created/${id}.log`)

*/
        } else return res.status(500).json({ message: 'Method not allowed' })
    }
}
export default handler
