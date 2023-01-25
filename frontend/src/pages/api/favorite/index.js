// GET
import cookie from 'cookie';
import { API_URL } from '../../../config/index';


export default async (req, res) => {
    if(req.method == 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if(access == false){
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        try {
            const apiRes = await fetch(`${API_URL}/api/favorite`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            });

            const data = await apiRes.json();
            
            if(apiRes.status === 200){
                return res.status(200).json({
                    favorite: data.data 
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data.error_message
                });
            }
            
        } catch (error) {
            return res.status(500).json({
                error: 'Something went wrong when retrieving users favorite place'
            });
        }
    } else if (req.method === 'POST') {
        /// Auth
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if(access == false){
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        const { place_id } = req.body;

        const body = JSON.stringify({
            place_id
        });

        try {
            const apiRes = await fetch(`${API_URL}/api/favorite`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
                body: body
            });

            const resValue = await apiRes.json();

            if(apiRes.status === 201){
                return res.status(201).json({success: 'Enroll favorite place successfully!'});
            } else {
                return res.status(apiRes.status).json({error: resValue.error_message});
            }
        } catch(err) {
            return res.status(500).json({
                'error': 'Something went wrong when enroll favorite place'
            });
        }
    } else {
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
