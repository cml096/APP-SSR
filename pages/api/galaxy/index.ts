import axios from 'axios';
import {NextApiRequest, NextApiResponse} from "next";

export interface GalaxiesResponse {
    collection: {
        items: Array<GalaxyItem>;
        version: string;
        href: string;
        metadata: {
            total_hits: number;
        };
        links: Array<{
            rel: string;
            prompt: string;
            href: string;
        }>;
    };
}

export interface GalaxyItem {
    href: string;
    data: Array<{
        center: string;
        title: string;
        nasa_id: string;
        date_created: string;
        keywords: Array<string>;
        media_type: string;
        description_508: string;
        secondary_creator: string;
        description: string;
    }>;
    links: Array<{
        href: string;
        rel: string;
        render: string;
    }>;
}

type ResponseType = Array<{ id: string; img: string; title: string; }>

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

        const data: ResponseType = []

        for(const item of res.data.collection.items) {
            const galaxy = {
                id: item.data[0].nasa_id,
                img: item.href || DEFAULT_GALAXY_IMG,
                title: item.data[0].title
            }
            data.push(galaxy)
        }

        response.setHeader('Content-Type', 'application/json');
        response.status(200).json({data})
    }catch (e: any) {
        response.statusCode = e.statusCode || 500;
        response.end(JSON.stringify({
            error: e,
            message: e?.message
        }));
    }
}

export default allGalaxies;

export const base_url = 'https://images-api.nasa.gov';
const DEFAULT_GALAXY_IMG = 'https://i.imgur.com/GHqELEK.jpeg';