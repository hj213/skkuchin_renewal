// 리뷰 등록

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

    if (req.method === 'POST') {
        /// Auth
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access == false) {
            return res.status(401).json({
                error: 'User unauthorized to make this request'
            });
        }

        const options = {
            keepExtensions: true,
            multiples: true
        };

        const form = new formidable.IncomingForm(options);

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ result: err });
            }

            const formData = new FormData();

            formData.append('place_id', parseInt(fields.place_id));
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

            fetch(`${API_URL}/api/review`, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${access}`
                },
                body: formData
            })
            .then((apiRes) => {
                const resValue = apiRes.json();

                if (apiRes.status === 201) {
                    return res.status(201).json({
                        review: resValue.data
                    });
                } else {
                    return res.status(apiRes.status).json({error: resValue.error_message});
                }
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    'error': 'Something went wrong when enroll review'
                });
            })

        });

    } else {
        return res.status(405).json({
            error: `Method ${req.method} not allowed`
        });
    }
}
