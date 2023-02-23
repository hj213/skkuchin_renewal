import cookie from 'cookie';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (access == false) {
        console.log('access 토큰이 존재하지 않습니다')
        return res.status(401).json({
            error: '다시 로그인해주시기 바랍니다'
        });
    }

    if (req.method == 'GET') {
        try {
            const apiRes = await fetch(`${API_URL}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            });
            const resValue = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    user: resValue.data,
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
                error: 'Something went wrong when retrieving user'
            });
        }
    } else if (req.method == 'PUT') {
        const { 
            nickname, major, image, student_id
        } = req.body;

        const body = JSON.stringify({
            nickname, major, image, student_id
        });


        try {
            const apiRes = await fetch(`${API_URL}/api/user/me`, {
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
                error: 'Something went wrong when changing user'
            });
        }
    } else if (req.method == 'DELETE') {
        try {
            const apiRes = await fetch(`${API_URL}/api/user/me`, {
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${access}`
                }
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
                error: 'Something went wrong when deleting user'
            });
        }
    } else {
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
