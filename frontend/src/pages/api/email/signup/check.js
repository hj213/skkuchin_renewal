import { API_URL } from "../../../../config/index";

export default async( req, res )=> {
    if(req.method === 'POST'){
        const data = req.body;

        const body = JSON.stringify(data);

        try {
            console.log("tttttt", body);
            const apiRes = await fetch(`${API_URL}/api/email/signup/check`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            });

            const resValue = await apiRes.json();

            if(apiRes.status === 200){
                return res.status(200).json({
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }

        } catch (error) {
            return res.status(500).json({
                'error': 'Something went wrong when registering for an account'
            })
        }
    }else{
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error' : `Method ${req.method} not allowed`});
    }
}