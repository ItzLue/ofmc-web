import fs from "fs";
import {NextApiRequest, NextApiResponse} from "next";


const handleUpload = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST' && req?.body?.code) {
        fs.writeFile(`./static/user-created/${Date.now()}.AnB`, req.body.code.toString(), (err) => {
            if (err) {
                return res.status(500).json({message: err.toString()});
            }
            return res.status(200).json({message: 'Success'});
        })
    }
}

export default handleUpload;
