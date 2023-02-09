import cookie from 'cookie';
import { API_URL } from '../../../config/index';


export default async (req, res) => {
    if(req.method == 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access == false) {
            console.log('access 토큰이 존재하지 않습니다')
            return res.status(401).json({
                error: '다시 로그인해주시기 바랍니다'
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

            const resValue = await apiRes.json();
            
            if(apiRes.status === 200){
                return res.status(200).json({
                    favorite: resValue.data,
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
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
                return res.status(201).json({
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
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
