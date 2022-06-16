import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs'
import { child, get, getDatabase, ref as dbref, update } from '@firebase/database'
import { getDownloadURL, getStorage, ref } from '@firebase/storage'
import { uploadBytesResumable } from '@firebase/storage'
import { execSync } from 'child_process'
import parseOfmcOutput from '../../../../helpers/server/parseOfmcOutput'

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
                if (err) return res.status(500).json({ message: err.toString() })
                //execSync(`./ofmc/ofmc.sh ${id}.AnB -o ${id}.log`)

                try {
                    const { numSess, depth } = settings

                    const numSessFlag = `--numSess ${Number(numSess)}`
                    const depthFlag = `${depth !== 0 ? `--depth ${Number(depth)}` : ''}`
                    execSync(
                        `ofmc ${numSessFlag} ${depthFlag} --attacktrace -o ofmc/user-created/${id}.log ofmc/user-created/${id}.AnB`
                    )

                    const log = fs.readFileSync(`ofmc/user-created/${id}.log`, {
                        encoding: 'utf8',
                    })
                    //   execSync(`rm ofmc/user-created/${id}.AnB`)
                    //   execSync(`rm ofmc/user-created/${id}.log`)

                    const parsed = parseOfmcOutput(log)

                    if (!parsed.attackFound) {
                        update(child(dbref(db), `protocols/${id}`), {
                            isComplete: true,
                        })
                    } else {
                        update(child(dbref(db), `protocols/${id}`), {
                            isComplete: false,
                        })
                    }

                    const storage = getStorage()
                    const svgRef = ref(storage, `svgs/9e161468-c6e4-42c5-b8f7-5b3614aa01f4.svg`) //change to /id
                    // Read svg files
                    fs.readFile(
                        'ofmc/user-created/9e161468-c6e4-42c5-b8f7-5b3614aa01f4.svg',
                        (err, data) => {
                            if (err) res.status(400).json({ message: err })
                            const uploadTask = uploadBytesResumable(svgRef, data, {
                                contentType: 'image/svg',
                            })

                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    // Observe state change events such as progress, pause, and resume
                                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                    const progress =
                                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
                                        return res.status(200).json({
                                            parsed,
                                            raw: log,
                                            svg: data.toString(),
                                        })
                                    })
                                }
                            )
                        }
                    )
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({ message: error.toString() })
                }
            })
        } else return res.status(500).json({ message: 'Method not allowed' })
    }
}
export default handler
