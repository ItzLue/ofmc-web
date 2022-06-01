import { NextApiRequest, NextApiResponse } from 'next'
import * as shell from 'child_process'

type IFiles = {
    name: string
    type: string
    id: number
}

const getAllTemplates = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        let files: IFiles[] = []

        shell.exec('ls ofmc/examples/classic', (err, stdout, stderr) => {
            stdout
                .split('\n')
                .filter((file) => file.includes('.AnB'))
                .map((file, index) => {
                    files.push({ name: file, id: index, type: 'classic' })
                })
            return res.status(200).json(files)
        })
    }
}

export default getAllTemplates
