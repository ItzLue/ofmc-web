import {NextApiRequest, NextApiResponse} from "next";
import * as shell from 'child_process';


const getAllTemplates = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const out = shell.execSync('ls static/templates', {encoding: 'utf8'});
        const files = out.split('\n').filter((file) => file.includes('.AnB'));
        return res.status(200).json({message: files});
    }
    return res.status(500).json({message: 'Method not allowed'});
}

export default getAllTemplates;
