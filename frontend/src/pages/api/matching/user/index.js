import cookie from 'cookie';
import { API_URL } from '../../../../config';

export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (access == false) {
        console.log('access 토큰이 존재하지 않습니다')
        return res.status(401).json({
            error: '다시 로그인해주시기 바랍니다'
        });
    }

    const { gender, keywords, introduction, mbti, image } = req.body;
    const body = JSON.stringify({ gender, keywords, introduction, mbti, image });

    if (req.method == 'POST') {
        try {
            const apiRes = await fetch(`${API_URL}/api/matching/user`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
                body: body
            });
            const resValue = await apiRes.json();

            if (apiRes.status === 201) {
                return res.status(201).json({
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: 'Something went wrong when adding matching info'
            });
        }
    } if (req.method == 'PUT') {
        try {
            const apiRes = await fetch(`${API_URL}/api/matching/user`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
                body: body
            });
            const resValue = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: 'Something went wrong when modifying matching info'
            });
        }
    } else {
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['POST', 'PUT']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
