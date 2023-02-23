import cookie from 'cookie';
import { API_URL } from '../../../config/index';


export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const body = JSON.stringify({
            username,
            password
        });

        try {
            const apiRes = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            const resValue = await apiRes.json();

            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', "123456789", {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 30,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', "12345678923123", {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ]);
                return res.status(200).json({
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }
        } catch(err) {
            return res.status(500).json({
                error: 'Something went wrong when attempting login'
            });
        }
    } else {
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
};