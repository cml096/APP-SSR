import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetch from 'isomorphic-unfetch'
import Image from 'next/image'
import Link from 'next/link'

interface GalaxyType {
    id: string;
    img: string;
    title: string;
}

interface StoreType {
    data: GalaxyType[];
    error: boolean;
}

const defaultStore = {
  data: [],
  error: false
}

const ITEMS_PER_PAGE = 16

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/galaxy')
    const { data } = await response.json()
    return {
      props: {
        ...defaultStore,
        data
      }
    }
  } catch (_e) {
    return {
      props: {
        ...defaultStore,
        error: true
      }
    }
  }
}
const Home = ({ data, error }: StoreType) => {
  const [items, setItems] = useState<Array<GalaxyType>>(data.slice(0, ITEMS_PER_PAGE))
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(data.length > ITEMS_PER_PAGE)

  const fetchMoreData = () => {
    if (items.length >= data.length) {
      setHasMoreItems(false)
      return
    }

    // a fake async function using setTimeout to simulate delay
    setTimeout(() => {
      setItems(data.slice(0, items.length + ITEMS_PER_PAGE))
    }, 500)
  }

  return (
    <div className='container'>
      <h1>Galaxies</h1>
      {error && <div>Thinks bad happened :(</div>}
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        <div className='galaxies-grid'>
          {items.map((galaxy) => (
            <Link href={`/galaxy/${galaxy.id}`} key={galaxy.id}>
              <div className='galaxy-item'>
                <Image src={galaxy.img} alt={galaxy.title} width={200} height={200} />
                <p>{galaxy.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Home
