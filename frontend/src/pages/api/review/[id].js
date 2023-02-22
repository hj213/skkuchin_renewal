import cookie from 'cookie';
import { API_URL } from '../../../config/index';
import { formidable } from 'formidable';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (access == false) {
        console.log('access 토큰이 존재하지 않습니다')
        return res.status(401).json({
            error: '다시 로그인해주시기 바랍니다'
        });
    }

    const review_id = parseInt(req.query.id, 10);

    if (req.method === 'PUT') {

        const options = {
            keepExtensions: true,
            multiples: true
        };

        const form = new formidable.IncomingForm(options);

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    'error': 'Something went wrong when parsing data'
                });
            }

            const formData = new FormData();

            formData.append('rate', parseInt(fields.rate));
            formData.append('content', fields.content);

            if (fields.tags && Array.isArray(fields.tags)) {
                for (const tag of fields.tags) {
                    formData.append('tags', tag);
                }
            } else {
                formData.append('tags', fields.tags);
            }

            if (files.images) {
                if (Array.isArray(files.images)) {
                    for (const image of files.images) {
                        const file = new Blob([fs.readFileSync(image.filepath)], { type: image.mimetype });
                        formData.append('images', file, image.originalFilename);
                        fs.rm(image.filepath);
                    }
                } else {
                    const file = new Blob([fs.readFileSync(files.images.filepath)], { type: files.images.mimetype });
                    formData.append('images', file, files.images.originalFilename);
                    fs.rm(files.images.filepath);
                }
            } else {
                formData.append('images', new Blob([""], { type: 'image/png' }));
            }

            fetch(`${API_URL}/api/review/${review_id}`, {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${access}`
                },
                body: formData
            })
            .then((apiRes) => {
                const resValue = apiRes.json();

                if (apiRes.status === 201) {
                    return res.status(201).json({
                        review: resValue.data,
                        success: resValue.message
                    });
                } else {
                    return res.status(apiRes.status).json({
                        error: resValue.message
                    });
                }
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    'error': 'Something went wrong when modify review'
                });
            })

        });

    } else if (req.method === 'DELETE') {
        try {
            const apiRes = await fetch(`${API_URL}/api/review/${review_id}`, {
                method: 'DELETE',
                headers: {
                    // 'Accept': 'application/json',
                    'Authorization' : `Bearer ${access}`
                },
            });

            const resValue = await apiRes.json();

            if (apiRes.status === 200) {
                return res.status(200).json({
                    review: resValue.data,
                    success: resValue.message
                });
            } else {
                return res.status(apiRes.status).json({
                    error: resValue.message
                });
            }
        } catch(err) {
            return res.status(500).json({
                'error': 'Something went wrong when delete review'
            });
        }
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).json({ 'error': `Method ${req.method} now allowed` });
    } 
};
