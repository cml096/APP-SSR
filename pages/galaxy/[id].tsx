import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Navbar from "../../components/Navbar/Navbar";

interface GalaxyType { id: string; img: string; title: string; description: string; created: string; }

interface StoreType {
    data: GalaxyType | null;
    loading: boolean;
    error: boolean;
}

const defaultStore = {
    data: null,
    loading: false,
    error: false
}

const GalaxyLayout = () => {
    const {query} = useRouter();
    const [store, setStore] = useState<StoreType>(defaultStore);

    useEffect(() => {
        if(!query.id) return;

        setStore({
            ...defaultStore,
            loading: true
        })
        window
            .fetch(`/api/galaxy/${query.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((res) => {
                const store: StoreType = {
                    ...defaultStore,
                    data: res.data as GalaxyType,
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
    }, [query]);

    return (
        <div>
            <Navbar/>
            <h1>Galaxies</h1>
            {store.loading && <div>Loading...</div>}
            {store.error && <div>Thinks bad happened :(</div>}
            {store.data !== null &&
                <div>
                    <img src={store.data.img}  alt={store.data.title}/>
                    <p>{store.data.title}</p>
                    <span>{store.data.description}</span>
                    <p>{store.data.created}</p>
                </div>
            }
        </div>
    )
}

export default GalaxyLayout;