import cookie from 'cookie';
import { API_URL } from '../../../config';


export default async (req, res) => {

    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access == false) {
            console.log('access 토큰이 존재하지 않습니다')
            return res.status(401).json({
                error: '다시 로그인해주시기 바랍니다'
            });
        }

        const { report_type, content, review_id, chat_room_id } = req.body;

        const body = JSON.stringify({
            report_type, content, review_id, chat_room_id
        });

        try {
            const apiRes = await fetch(`${API_URL}/api/report`, {
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
        } catch(err) {
            return res.status(500).json({
                'error': 'Something went wrong when report'
            });
        }
    } else {
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
