// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import * as shell from 'child_process';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const log = shell.execSync("ofmc ./static/tls.AnB --numSess 2", {encoding: 'utf8'});
        return res.status(200).json({message: log.toString()});
    }
    return res.status(500).json({message: 'Method not allowed'});
};

export default handler;
