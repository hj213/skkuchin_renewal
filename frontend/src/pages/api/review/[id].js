// 리뷰 수정, 삭제

import cookie from 'cookie';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
    if (req.method === 'PUT') {
        /// Auth
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if(access == false){
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        const {rate, content, image, tags} = req.body

        const body = JSON.stringify({
            rate,
            content,
            image,
            tags
        })

        try {
            const apiRes = await fetch(`${API_URL}/api/review/${review_id}`, {
                method: 'PUT',
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
                'error': 'Something went wrong when modify review'
            });
        }

    } else if(req.method === 'DELETE') {
        /// Auth
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if(access == false){
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        // const { review_id } = req.body;
        const review_id = parseInt(req.query.id, 10);

        try {
            const apiRes = await fetch(`${API_URL}/api/review/${review_id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
            });

            const returnValue = await apiRes.json();

            if(apiRes.status === 200){
                return res.status(200).json({
                    review: returnValue.data
                });
            } else {
                return res.status(apiRes.status).json({error: data.error});
            }
        } catch(err) {
            return res.status(500).json({
                'error': 'Something went wrong when delete review'
            });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ 'error': `Method ${req.method} now allowed` });
    } 
};
