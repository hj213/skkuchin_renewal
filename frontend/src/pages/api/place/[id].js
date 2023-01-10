
import { API_URL } from "../../../config";

export default async(req, res) => {

    const place_id = parseInt(req.query.id, 10);

    if(req.method == 'GET'){
        
        try {
            const apiRes = await fetch(`${API_URL}/api/place/${place_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            const data = await apiRes.json();

            if(apiRes.status == 200){
                return res.status(200).json({
                    place:data.data
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
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
};