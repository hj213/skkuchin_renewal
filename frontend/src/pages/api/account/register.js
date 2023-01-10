import { API_URL } from "../../../config/index";

export default async( req, res )=> {
    if(req.method === 'POST'){
        const { 
            nickname,
            username,
            password,
            re_password,
            email,
            student_id,
            major,
            mbti,
            image
        } = req.body;

        const body = JSON.stringify({
            nickname,
            username,
            password,
            re_password,
            email,
            student_id,
            major,
            mbti,
            image
        });

        try {
            const apiRes = await fetch(`${API_URL}/api/user/saves`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            });

            const data = await apiRes.json();
            // 지우기
            console.log("register: "+data +" "+ apiRes.status);
            console.log("required method : "+ req.method);
            if(apiRes.status === 201){
                return res.status(201).json({success: 'Sign up successfully!'});
            } else {
                return res.status(apiRes.status).json({error: data.error});
            }

        } catch (error) {
            return res.status(500).json({
                'error': 'Something went wrong when registering for an account'
            })
        }
    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ 'error' : `Method ${req.method} not allowed`});
    }
}