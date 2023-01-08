
import { API_URL } from "../../../config";

export default async(req, res) => {
    if(req.method == 'GET'){

        // if(access = false){
        //     return res.status(401).json({
        //         error: ''
        //     });
        // }

        try {
            const apiRes = await fetch(`${API_URL}/api/map/place`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            const data = await apiRes.json();

            if(apiRes.status == 200){
                return res.status(200).json({
                    user:data
                });
            } else {
                return res.status(apiRes.status).json({
                    error: data.error_message
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: 'Something went wrong when retrieving place'
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.statusa(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
};