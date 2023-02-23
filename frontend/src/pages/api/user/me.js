import cookie from 'cookie';
import { API_URL } from '../../../config/index';

export default async (req, res) => {
    const logs = [];

    const onee = {
        "user api 진입": true
    }
    logs.push(onee);

    const cookies = cookie.parse(req.headers.cookie ?? '');

    const one = {
        "user cookies": cookies
    }
    logs.push(one);

    const access = cookies.access ?? false;

    const two = {
        "user access": access
    }
    logs.push(two);
    
    if (access == false) {
        const three = {
            "user no token": 'access 토큰이 존재하지 않습니다'
        }
        logs.push(three);

        console.log('access 토큰이 존재하지 않습니다')
        return res.status(401).json({
            error: '다시 로그인해주시기 바랍니다'
        });
    }

    const four = {
        "user api fetch 직전": true
    }
    logs.push(four);

    if (req.method == 'GET') {
        try {
            const apiRes = await fetch(`${API_URL}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            });

            const five = {
                "user apiRes": apiRes
            }
            logs.push(five);
            
            const resValue = await apiRes.json();

            const six = {
                "user resValue": resValue
            }
            logs.push(six);
            
            if (apiRes.status === 200) {

                const seven = {
                    "user 200": 200
                }
                logs.push(seven);

                return res.status(200).json({
                    logs: logs,
                    user: resValue.data,
                    success: resValue.message
                });
            } else {

                const eight = {
                    "user fail": apiRes.status
                }
                logs.push(eight);

                return res.status(apiRes.status).json({
                    logs: logs,
                    error: resValue.message
                });
            }
            
        } catch (error) {

            const nine = {
                "user 500": error
            }
            logs.push(nine);

            console.log(error)
            return res.status(500).json({
                logs: logs,
                error: 'Something went wrong when retrieving user'
            });
        }
    } else if (req.method == 'PUT') {
        const { 
            nickname, major
        } = req.body;

        const body = JSON.stringify({
            nickname, major
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
        const ten = {
            "user fail": `Method ${req.method} now allowed`
        }
        logs.push(ten);

        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({
            logs: logs,
            error: `Method ${req.method} not allowed`
        });
    }
}
