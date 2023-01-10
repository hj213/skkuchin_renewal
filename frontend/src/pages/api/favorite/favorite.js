// get favorite : GET
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
            // const apiRes = await fetch(`${API_URL}/api/place`, {
            const apiRes = await fetch(`${API_URL}/api/favorite`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            });
            
            const data = await apiRes.json();
            console.log(apiRes);
            console.log("get place: "+data +" "+ apiRes.status);
            console.log("required method : "+ req.method);

    
            if(apiRes.status === 200){
                return res.status(200).json({
                    favorite: data.data
                    // place: data.data
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data.error_message
                });
            }
            
        } catch (error) {
            console.log("error!"+res);
            return res.status(500).json({
                error: 'Something went wrong when retrieving users favorite place'
            });
        }
    }else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
