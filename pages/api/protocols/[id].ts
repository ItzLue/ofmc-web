import { NextApiRequest, NextApiResponse } from 'next'
import { child, getDatabase, onValue, ref, remove, update } from '@firebase/database'

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
                { onlyOnce: true }
            )
        }
        if (id && template) {
            const templateRef = ref(db, `templates/${id}`)
            return onValue(
                templateRef,
                (snapshot) => {
                    return res.status(200).json({
                        protocol: snapshot.val(),
                        attack: {
                            parsed: {
                                inputFile: 'EPMO.AnB',
                                attackFound: true,
                                goal: 'weak_auth',
                                attackTrace: [
                                    {
                                        step: 1,
                                        from: '(x902,1)',
                                        to: 'i',
                                        payload: 'one,{x902,NC(1),Goods(1),Price(1)}_(pk(x36))',
                                    },
                                    {
                                        step: 1,
                                        from: 'i',
                                        to: '(x36,1)',
                                        payload: 'one,{x902,NC(1),Goods(1),Price(1)}_(pk(x36))',
                                    },
                                    {
                                        step: 2,
                                        from: '(x36,1)',
                                        to: 'i',
                                        payload:
                                            'two,{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902))',
                                    },
                                    {
                                        step: 2,
                                        from: 'i',
                                        to: '(x902,1)',
                                        payload:
                                            'two,{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902))',
                                    },
                                    {
                                        step: 3,
                                        from: '(x902,1)',
                                        to: 'i',
                                        payload: 'three,{x902,NC(1),NM(2),Price(1)}_(pk(x901))',
                                    },
                                    {
                                        step: 3,
                                        from: 'i',
                                        to: '(x901,1)',
                                        payload: 'three,{x902,NC(1),NM(2),Price(1)}_(pk(x901))',
                                    },
                                    {
                                        step: 4,
                                        from: '(x901,1)',
                                        to: 'i',
                                        payload:
                                            'four,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{NC(1),NB(4)}_(pk(x902))',
                                    },
                                    {
                                        step: 4,
                                        from: 'i',
                                        to: '(x902,1)',
                                        payload:
                                            'four,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{NC(1),NB(4)}_(pk(x902))',
                                    },
                                    {
                                        step: 5,
                                        from: '(x902,1)',
                                        to: 'i',
                                        payload:
                                            'five,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),NB(4)',
                                    },
                                    {
                                        step: 5,
                                        from: 'i',
                                        to: '(x36,1)',
                                        payload:
                                            'five,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),NB(4)',
                                    },
                                    {
                                        step: 6,
                                        from: '(x36,1)',
                                        to: 'i',
                                        payload: 'six,{hash(x901,NB(4),NM(2))}_inv(pk(x36))',
                                    },
                                    {
                                        step: 6,
                                        from: 'i',
                                        to: '(x901,1)',
                                        payload: 'six,{hash(x901,NB(4),NM(2))}_inv(pk(i))',
                                    },
                                ],
                                statistics: {
                                    visitedNodes: 59,
                                    depth: 6,
                                },
                            },
                            raw: 'Open-Source Fixedpoint Model-Checker version 2020\nINPUT:\n   EPMO.AnB\nSUMMARY:\n  ATTACK_FOUND\nGOAL:\n  weak_auth\nBACKEND:\n  Open-Source Fixedpoint Model-Checker version 2020\nSTATISTICS:\n  visitedNodes: 59 nodes\n  depth: 6 plies\n\nATTACK TRACE:\n(x902,1) -> i: one,{x902,NC(1),Goods(1),Price(1)}_(pk(x36))\ni -> (x36,1): one,{x902,NC(1),Goods(1),Price(1)}_(pk(x36))\n(x36,1) -> i: two,{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902))\ni -> (x902,1): two,{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902))\n(x902,1) -> i: three,{x902,NC(1),NM(2),Price(1)}_(pk(x901))\ni -> (x901,1): three,{x902,NC(1),NM(2),Price(1)}_(pk(x901))\n(x901,1) -> i: four,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{NC(1),NB(4)}_(pk(x902))\ni -> (x902,1): four,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{NC(1),NB(4)}_(pk(x902))\n(x902,1) -> i: five,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),NB(4)\ni -> (x36,1): five,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),NB(4)\n(x36,1) -> i: six,{hash(x901,NB(4),NM(2))}_inv(pk(x36))\ni -> (x901,1): six,{hash(x901,NB(4),NM(2))}_inv(pk(i))\n\n\n% Reached State:\n% \n% request(x901,x902,pBCPriceBM,Price(1),x901,i,1)\n% state_rB(x901,2,six,five,four,three,two,one,hash,inv(pk(x901)),pk,i,x902,Price(1),NM(2),NC(1),{x902,NC(1),NM(2),Price(1)}_(pk(x901)),three,{x902,NC(1),NM(2),Price(1)}_(pk(x901)),NB(4),four,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{NC(1),NB(4)}_(pk(x902)),x809,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{hash(x901,NB(4),NM(2))}_inv(pk(i)),six,{hash(x901,NB(4),NM(2))}_inv(pk(i)),1)\n% state_rM(x36,2,six,five,four,three,two,one,hash,inv(pk(x36)),pk,x902,x901,Price(1),Goods(1),NC(1),{x902,NC(1),Goods(1),Price(1)}_(pk(x36)),one,{x902,NC(1),Goods(1),Price(1)}_(pk(x36)),NM(2),two,{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902)),x710,NB(4),{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),five,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),NB(4),six,{hash(x901,NB(4),NM(2))}_inv(pk(x36)),1)\n% state_rC(x902,3,six,five,four,three,two,one,hash,inv(pk(x902)),pk,x36,x901,NC(1),Goods(1),Price(1),one,{x902,NC(1),Goods(1),Price(1)}_(pk(x36)),x409,NM(2),{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902)),two,{NC(1),NM(2),x36,Goods(1),Price(1)}_(pk(x902)),three,{x902,NC(1),NM(2),Price(1)}_(pk(x901)),x611,NB(4),{NC(1),NB(4)}_(pk(x902)),hash(x902,NC(1),NB(4),NM(2),Price(1)),{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),four,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),{NC(1),NB(4)}_(pk(x902)),five,{hash(x902,NC(1),NB(4),NM(2),Price(1))}_inv(pk(x901)),NB(4),1)\n% witness(x902,x901,pBCPriceBM,Price(1),x901,x36)\n% witness(x902,x36,pMCGoodsPriceB,Goods(1),Price(1),x901)\n% request(x36,x902,pMCGoodsPriceB,Goods(1),Price(1),x901,1)\n\n',
                            svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\r\n<rect x="0" y="0" width="100" height="20" style="fill:black;stroke:black;stroke-width:2"/>\r\n<text x="50" y="15" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif">\r\n(x602,1)</text>\r\n<line x1="50" y1="20" x2="50" y2="400" style="stroke:white;stroke-width:2" />\r\n<rect x="25" y="400" width="50" height="10" style="fill:black;stroke:black;stroke-width:2"/>\r\n<rect x="150" y="0" width="100" height="20" style="fill:black;stroke:black;stroke-width:2"/>\r\n<text x="200" y="15" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif">\r\ni</text>\r\n<line x1="200" y1="20" x2="200" y2="400" style="stroke-width:2" />\r\n<rect x="175" y="400" width="50" height="10" style="fill:black;stroke:black;stroke-width:2"/>\r\n<rect x="300" y="0" width="100" height="20" style="fill:black;stroke:black;stroke-width:2"/>\r\n<text x="350" y="15" text-anchor="middle" style="font-family: Arial, Helvetica, sans-s erif">1\r\n(x601,1)</text>\r\n<line x1="350" y1="20" x2="350" y2="400" style="stroke:white;stroke-width:2" />\r\n<rect x="325" y="400" width="50" height="10" style="fill:black;stroke:black;stroke-width:2"/>\r\n<line x1="50.0" y1="50" x2="200.0" y2="50" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="40" x2="200.0" y2="50" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="60" x2="200.0" y2="50" style="stroke:white;stroke-width:2" />\r\n<text x="125.0" y="45" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif;fill:white;stroke:white"> {NA(1),x602}_(pk(i))</text>\r\n<line x1="200.0" y1="100" x2="350.0" y2="100" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="90" x2="350.0" y2="100" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="110" x2="350.0" y2="100" style="stroke:white;stroke-width:2" />\r\n<text x="275.0" y="95" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif;fill:white;stroke:white"> {NA(1),x602}_(pk(x601))</text>\r\n<line x1="200.0" y1="150" x2="350.0" y2="150" style="stroke:white;stroke-width:2" />\r\n<line x1="210.0" y1="140" x2="200.0" y2="150" style="stroke:white;stroke-width:2" />\r\n<line x1="210.0" y1="160" x2="200.0" y2="150" style="stroke:white;stroke-width:2" />\r\n<text x="275.0" y="145" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NA(1),NB(2)}_(pk(x602))</text>\r\n<line x1="50.0" y1="200" x2="200.0" y2="200" style="stroke:white;stroke-width:2" />\r\n<line x1="60.0" y1="190" x2="50.0" y2="200" style="stroke:white;stroke-width:2" />\r\n<line x1="60.0" y1="210" x2="50.0" y2="200" style="stroke:white;stroke-width:2" />\r\n<text x="125.0" y="195" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NA(1),NB(2)}_(pk(x602))</text>\r\n<line x1="50.0" y1="250" x2="200.0" y2="250" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="240" x2="200.0" y2="250" style="stroke:white;stroke-width:2" />\r\n<line x1="190.0" y1="260" x2="200.0" y2="250" style="stroke:white;stroke-width:2" />\r\n<text x="125.0" y="245" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NB(2)}_(pk(i))</text>\r\n<line x1="200.0" y1="300" x2="350.0" y2="300" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="290" x2="350.0" y2="300" style="stroke:white;stroke-width:2" />\r\n<line x1="340.0" y1="310" x2="350.0" y2="300" style="stroke:white;stroke-width:2" />\r\n<text x="275.0" y="295" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif"> {NB(2)}_(pk(x601))</text>\r\n</svg>\r\n',
                        },
                    })
                },
                { onlyOnce: true }
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
