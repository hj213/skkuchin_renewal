import cookie from 'cookie';
import { API_URL } from '../../../config/index';


export default async (req, res) => {
    const logs = []

    const onee = {
        "login api 진입": true
    }
    logs.push(onee);

    if (req.method === 'POST') {
        const { username, password } = req.body;

        const one = {
            "login req.body": req.body
        }
        logs.push(one);

        const body = JSON.stringify({
            username,
            password
        });

        const two = {
            "login body": body
        }
        logs.push(two);

        try {
            const twoo = {
                "login api fetch 직전": true
            }
            logs.push(twoo);

            const apiRes = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            const three = {
                "login apiRes": apiRes
            }
            logs.push(three);

            const resValue = await apiRes.json();

            const four = {
                "login resValue": resValue
            }
            logs.push(four);

            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', resValue.data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 30,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', resValue.data.refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ]);

                const five = {
                    "login 200": res.getHeader('')
                }
                logs.push(five);

                return res.status(200).json({
                    logs: logs,
                    success: resValue.message
                });
            } else {

                const six = {
                    "login fail": apiRes.status
                }
                logs.push(six);

                return res.status(apiRes.status).json({
                    logs: logs,
                    error: resValue.message
                });
            }
        } catch(err) {

            const seven = {
                "login 500": err
            }
            logs.push(seven);

            return res.status(500).json({
                logs: logs,
                error: 'Something went wrong when attempting login'
            });
        }
    } else {
        const eight = {
            "login fail": `Method ${req.method} now allowed`
        }
        logs.push(eight);

        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ logs: logs, error: `Method ${req.method} now allowed` });
    } 
};