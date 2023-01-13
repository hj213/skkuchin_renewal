// 리뷰 등록

import cookie from 'cookie';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
    if (req.method === 'POST') {
        /// Auth
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if(access == false){
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        // const { place_id, rate, content, image, tags } = req.body;

        // const body = JSON.stringify({
        //     place_id,
        //     rate,
        //     content,
        //     image,
        //     tags
        // });

        try {
            const apiRes = await fetch(`${API_URL}/api/review`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
                body: body
            });

            const returnValue = await apiRes.json();

            if(apiRes.status === 201){
                return res.status(201).json({
                    review: returnValue.data
                });
            } else {
                return res.status(apiRes.status).json({error: data.error});
            }
        } catch(err) {
            return res.status(500).json({
                'error': 'Something went wrong when enroll review'
            });
        }
    } else {
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
