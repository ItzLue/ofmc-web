import { NextApiRequest, NextApiResponse } from 'next'
import { child, getDatabase, onValue, ref, remove, update } from '@firebase/database'
import fs from 'fs'
import parseOfmcOutput from '@/helpers/server/parseOfmcOutput'

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

            const log = fs.readFileSync(`ofmc/templates/log/${id}.log`, {
                encoding: 'utf8',
            })

            return onValue(
                templateRef,
                (snapshot) => {
                    return res.status(200).json({
                        protocol: snapshot.val(),
                        attack: {
                            parsed: log ? parseOfmcOutput(log) : null,
                            raw: log || '',
                            svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\r\n<rect x="0" y="0" width="100" height="20" style="fill:black;stroke:black;stroke-width:2"/>\r\n<text x="50" y="15" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif">\r\n(x602,1)</text>\r\n<line x1="50" y1="20" x2="50" y2="400" style="stroke:white;stroke-width:2" />\r\n<rect x="25" y="400" width="50" height="10" style="fill:black;stroke:black;stroke-width:2"/>\r\n<rect x="150" y="0" width="100" height="20" style="fill:black;stroke:black;stroke-width:2"/>\r\n<text x="200" y="15" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif">\r\ni</text>\r\n<line x1="200" y1="20" x2="200" y2="400" style="stroke-width:2" />\r\n<rect x="175" y="400" width="50" height="10" style="fill:black;stroke:black;stroke-width:2"/>\r\n<rect x="300" y="0" width="100" height="20" style="fill:black;stroke:black;stroke-width:2"/>\r\n<text x="350" y="15" text-anchor="middle" style="font-family: Arial, Helvetica, sans-s erif">1\r\n(x601,1)</text>\r\n<line x1="350" y1="20" x2="350" y2="400" style="stroke:white;stroke-width:2" />\r\n<rect x="325" y="400" width="50" height="10" style="fill:black;stroke:black;stroke-width:2"/>\r\n<line x1="50.0" y1="50" x2="200.0" y2="50" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="40" x2="200.0" y2="50" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="60" x2="200.0" y2="50" style="stroke:white;stroke-width:2" />\r\n<text x="125.0" y="45" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif;fill:white;stroke:white"> {NA(1),x602}_(pk(i))</text>\r\n<line x1="200.0" y1="100" x2="350.0" y2="100" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="90" x2="350.0" y2="100" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="110" x2="350.0" y2="100" style="stroke:white;stroke-width:2" />\r\n<text x="275.0" y="95" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif;fill:white;stroke:white"> {NA(1),x602}_(pk(x601))</text>\r\n<line x1="200.0" y1="150" x2="350.0" y2="150" style="stroke:white;stroke-width:2" />\r\n<line x1="210.0" y1="140" x2="200.0" y2="150" style="stroke:white;stroke-width:2" />\r\n<line x1="210.0" y1="160" x2="200.0" y2="150" style="stroke:white;stroke-width:2" />\r\n<text x="275.0" y="145" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NA(1),NB(2)}_(pk(x602))</text>\r\n<line x1="50.0" y1="200" x2="200.0" y2="200" style="stroke:white;stroke-width:2" />\r\n<line x1="60.0" y1="190" x2="50.0" y2="200" style="stroke:white;stroke-width:2" />\r\n<line x1="60.0" y1="210" x2="50.0" y2="200" style="stroke:white;stroke-width:2" />\r\n<text x="125.0" y="195" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NA(1),NB(2)}_(pk(x602))</text>\r\n<line x1="50.0" y1="250" x2="200.0" y2="250" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="240" x2="200.0" y2="250" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="260" x2="200.0" y2="250" style="stroke:white;stroke-width:2" />\r\n<text x="125.0" y="245" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NB(2)}_(pk(i))</text>\r\n<line x1="200.0" y1="300" x2="350.0" y2="300" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="290" x2="350.0" y2="300" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="310" x2="350.0" y2="300" style="stroke:white;stroke-width:2" />\r\n<text x="275.0" y="295" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NB(2)}_(pk(x601))</text>\r\n</svg>\r\n',
                        },
                    })
                },
                { onlyOnce: true },
            )
        } else {
            res.status(500).json({ message: 'Parameters is missing' })
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query

        const protocolRef = ref(db, `protocols/${id}`)
        await remove(protocolRef)
            .then(() => {
                return res.status(200).json({ message: 'Protocol deleted' })
            })
            .catch(() => res.status(500).json({ message: 'Error deleting protocol' }))
    } else if (req.method === 'PATCH') {
        const { id } = req.query
        const { name } = req.body

        update(child(ref(db), `protocols/${id}`), {
            name,
        })
            .then(() => {
                return res.status(200).json({ message: 'Protocol updated' })
            })
            .catch(() => res.status(500).json({ message: 'Error updating protocol' }))
    } else {
        return res.status(500).json({ message: 'Method not allowed' })
    }
}

export default handle
