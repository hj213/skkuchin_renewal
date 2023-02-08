import { API_URL } from '../../../config/index';

export default async (req, res) => {
    if (req.method === 'GET') {
        const { email } = req.body;

        const body = JSON.stringify({
            email
        });

        try {
            const apiRes = await fetch(`${API_URL}/api/user/find/username`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            const resValue = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    username: resValue.data,
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }
        } catch(err) {
            console.log(err);
            return res.status(500).json({
                error: 'Something went wrong when finding username'
            });
        }
    } else {
        console.log(`Method ${req.method} now allowed`);
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} now allowed` });
    } 
};