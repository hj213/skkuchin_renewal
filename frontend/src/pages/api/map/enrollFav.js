// enroll favorite : POST
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
        ///

        const { place_id } = req.body;

        const body = JSON.stringify({
            place_id
        });

        console.log("body "+body); 
        console.log("place_id : "+ place_id);
        try {
            // const apiRes = await fetch(`${API_URL}/api/review`, {
            const apiRes = await fetch(`${API_URL}/api/favorite`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
                body: body
            });

            const data = await apiRes.json();
            // 에러
            console.log(apiRes);
            console.log("enroll fav: "+ data +" "+ apiRes.status);
            console.log("required method : "+ req.method);

            if(apiRes.status === 201){
                return res.status(201).json({success: 'Enroll favorite place successfully!'});
            } else {
                return res.status(apiRes.status).json({error: data.error});
            }
        } catch(err) {
            console.log("Error!!");
            return res.status(500).json({
                'error': 'Something went wrong when enroll favorite place'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error': `Method ${req.method} now allowed` });
    } 
};