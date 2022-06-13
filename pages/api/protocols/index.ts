import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'
import { get, getDatabase, ref } from '@firebase/database'
import slugify from 'slugify'
import { writeNewProtocol } from '@/helpers/firebase/protocols/create-new-protocol'
import { IProtocol } from '@/types/protocol'

const defaultStartingCode = `Protocol: TLS_pw  # Bounded-verified
# variant without client certificate
# and using a guessable password to authenticate the client

Types: Agent A,B,s;
       Number NA,NB,Sid,PA,PB,PMS;
       Function pk,hash,clientK,serverK,prf,pw

Knowledge: 
A: A,pk(s),B,hash,clientK,serverK,prf,pw(A,B);
B: B,A,pk(B),pk(s),inv(pk(B)),{B,pk(B)}inv(pk(s)),hash,clientK,serverK,prf,pw(A,B)

Actions:

A->B: A,NA,Sid,PA
B->A: NB,Sid,PB,{B,pk(B)}inv(pk(s))
A->B: {PMS}pk(B),
      hash(NB,B,PMS),
      {|hash(prf(PMS,NA,NB),A,B,NA,NB,Sid,PA,PB,PMS),   pw(A,B)  |}
        clientK(NA,NB,prf(PMS,NA,NB))
B->A: {|hash(prf(PMS,NA,NB),A,B,NA,NB,Sid,PA,PB,PMS)|}
        serverK(NA,NB,prf(PMS,NA,NB))
Goals:

B authenticates A on prf(PMS,NA,NB)
A authenticates B on prf(PMS,NA,NB)
prf(PMS,NA,NB) secret between A,B
pw(A,B) guessable secret between A,B`

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const protocol: IProtocol = {
            isComplete: req.body.isComplete,
            urlSlug: slugify(req.body.name),
            uid: uuidv4().toString(),
            name: req.body.name,
            type: req.body.type,
            isTemplate: req.body.isTemplate,
            templateId: req.body.templateId,
            startingCode: defaultStartingCode,
        }
        await writeNewProtocol(protocol, req.body.userId)
        res.status(200).json({ protocol })
    } else if (req.method === 'GET') {
        const { userId } = req.query
        const db = getDatabase()
        const protocolsRef = ref(db, 'protocols')
        return get(protocolsRef).then((snapshot) => {
            const protocols: IProtocol[] = snapshot.val()
            const result: IProtocol[] = []
            for (let i in protocols) {
                if (protocols[i].userId === userId) { //TODO Quickfix to get users protocols
                result.push({ ...protocols[i], uid: i })
                }
            }
            return res.status(200).json({ protocols: result })
        })
    } else {
        return res.status(500).json({ message: 'Method not allowed' })
    }
}

export default handle
