import { API_URL} from '../../../../config/index'
import cookie from 'cookie';

export default async (req, res ) => {
    if (req.method === 'GET'){
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const refresh = cookies.refresh ?? false;

        if (refresh == false) {
            console.log('refresh 토큰이 존재하지 않습니다')
            return res.status(401).json({
                error: '다시 로그인해주시기 바랍니다'
            });
        }

        try {
            const apiRes = await fetch(`${API_URL}/api/user/token/refresh`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization' : `Bearer ${refresh}`
                }
            })

            const resValue = await apiRes.json();

            if(apiRes.status === 200){
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', resValue.data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'production',
                            maxAge: 60*30,
                            sameSite: 'strict',
                            path:'/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', resValue.data.refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'production',
                            maxAge: 60*60*24,
                            sameSite: 'strict',
                            path:'/api/'
                        }
                    )
                ]);


                return res.status(200).json({
                    success: resValue.message
                });
            }else{
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Something went wrong when trying to fulfill refresh request'
            });
        }
    } else{
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['GET']);
        return res.status(405).json(
            { error: `Method ${req.method} not allowed`}
        )
    }
};