import Navbar from "../components/Navbar/Navbar";
import {useEffect, useState} from "react";

interface GalaxyType {
    id: string;
    img: string;
    title: string;
}

interface StoreType {
    data: GalaxyType[];
    loading: boolean;
    error: boolean;
}

const defaultStore = {
    data: [],
    loading: false,
    error: false
}

const Home = () => {
    const [store, setStore] = useState<StoreType>(defaultStore);

    useEffect(() => {
        setStore({
            ...defaultStore,
            loading: true
        })
        window
            .fetch('/api/galaxy')
            .then(res => res.json())
            .then((res) => {
                const store: StoreType = {
                    ...defaultStore,
                    data: res.data as GalaxyType[],
                }
                setStore(store)
            })
            .catch((e) => {
                console.error('Something Happening', { error: e});
                setStore({
                    ...defaultStore,
                    error: true
                })
            })
    }, []);

    return (
        <div>
            <Navbar/>
            <h1>Galaxies</h1>
            {store.loading && <div>Loading...</div>}
            {store.error && <div>Thinks bad happened :(</div>}
            {store.data.length > 0 &&
                <div>
                    {store.data.map((galaxy) => (
                        <div key={galaxy.id} >
                            <img src={galaxy.img}  alt={galaxy.title}/>
                            <p>{galaxy.title}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Home;