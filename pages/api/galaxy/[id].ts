import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { BASE_URL, GalaxiesResponse } from './index'

type ResponseType = { id: string; img: string; title: string; description: string; created: string; }

const allGalaxies = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const res: { data: GalaxiesResponse } = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: 'galaxies'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const nasaId = request.query.id
    let data: ResponseType | null = null

    for (const item of res.data.collection.items) {
      if (item.data[0].nasa_id === nasaId) {
        data = {
          id: item.data[0].nasa_id,
          img: item.links[0].href,
          title: item.data[0].title,
          description: item.data[0].description,
          created: item.data[0].date_created
        }
        break
      }
    }

    if (data === null) {
      response.statusCode = 400
      response.end(JSON.stringify({
        message: 'Not Found'
      }))
    }

    response.setHeader('Content-Type', 'application/json')
    response.status(200).json({ data })
  } catch (e: any) {
    response.statusCode = e.statusCode || 500
    response.end(JSON.stringify({
      error: e,
      message: e?.message
    }))
  }
}

export default allGalaxies
