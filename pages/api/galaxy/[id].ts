import axios from 'axios';
import {NextApiRequest, NextApiResponse} from "next";
import {base_url, GalaxiesResponse} from "./index";

type ResponseType = { id: string; img: string; title: string; description: string; created: string; }

const allGalaxies = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const res: {data: GalaxiesResponse} = await axios.get(`${base_url}/search`, {
            params: {
                q: 'galaxies',
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const nasa_id = request.query.id;
        let data: ResponseType | null = null;

        for ( const item of res.data.collection.items) {
            if (item.data[0].nasa_id === nasa_id) {
                data = {
                    id: item.data[0].nasa_id,
                    img: item.href,
                    title: item.data[0].title,
                    description: item.data[0].description,
                    created: item.data[0].date_created
                }
                break;
            }
        }

        if(data === null){
            throw {
                statusCode: 400,
                message: 'Not Found'
            }
        }

        response.setHeader('Content-Type', 'application/json');
        response.status(200).json({ data });
    }catch (e: any) {
        response.statusCode = e.statusCode || 500;
        response.end(JSON.stringify({
            error: e,
            message: e?.message
        }));
    }
}

export default allGalaxies;