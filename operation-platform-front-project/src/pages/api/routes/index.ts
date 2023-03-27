import {NextApiRequest, NextApiResponse} from "next";

export default function handler(req: NextApiRequest,resp: NextApiResponse) {
    return resp.json({
        routes: [
            {
                name: '权限管理',
                path: '/dashboard',
                layout: '/admin',
                icon: 'MdHome'
            }
        ]
    })
}