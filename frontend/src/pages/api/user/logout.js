import cookie from 'cookie';

export default async (req, res) => {
    if(req.method === 'POST'){
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                        'access', '', {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            expires: new Date(0),
                            sameSite: 'none',
                            path: '/api/',

                        }
                    ),
                    cookie.serialize(
                        'refresh', '', {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            expires: new Date(0),
                            sameSite: 'none',
                            path: '/api/',

                        }
                    )
        ]);

        return res.status(200).json({
            success: '로그아웃 되었습니다'
        });
    }else {
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['POST']);
        return res.status(450).json({
            error: `Method ${req.method} not allowed`
        })
    }
}