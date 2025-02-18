import { createContext, ReactElement, useState } from "react"

export type AlbumType = {
    id: string,
    name: string,
    artist: string,
    category: string,
    price: number,
}

const initState: AlbumType[] = [
    {
        "id" : "AL001",
        "name" : "SOS Deluxe:LANA",
        "artist" : "SZA",
        "category" : "R&B",
        "price" : 14.99
    },
    {
        "id" : "AL002",
        "name" : "Eternal Sunshine",
        "artist" : "Ariana Grande",
        "category" : "Pop",
        "price" : 10.99
    },
    {
        "id" : "AL003",
        "name" : "GNX",
        "artist" : "Kendrick Lamar",
        "category" : "Hiphop",
        "price" : 13.98
    },
    {
        "id" : "AL004",
        "name" : "Bryson Tiller",
        "artist" : "Bryson Tiller",
        "category" : "R&B",
        "price" : 13.98
    },
    {
        "id" : "AL005",
        "name" : "Short n' Sweet",
        "artist" : "Sabrina Carpenter",
        "category" : "Pop",
        "price" : 9.98
    },
    {
        "id" : "AL006",
        "name" : "Chromakopia",
        "artist" : "Tyler The Creator",
        "category" : "Hiphop",
        "price" : 12.98
    },
    {
        "id" : "AL007",
        "name" : "PartyNextDoor 4",
        "artist" : "PartyNextDoor",
        "category" : "R&B",
        "price" : 9.99
    },
    {
        "id" : "AL008",
        "name" : "Charm",
        "artist" : "Clairo",
        "category" : "Pop",
        "price" : 11.50
    },
    {
        "id" : "AL009",
        "name" : "Alligator Bites Never Heal",
        "artist" : "Doechii",
        "category" : "Hiphop",
        "price" : 10.99
    }
]

export type AlbumContextType = { albums: AlbumType[]}

const initContextState: AlbumContextType = { albums: []}

const AlbumsContext = createContext<AlbumContextType>(initContextState)

type childAlbumType = { children ?: ReactElement | ReactElement[]}

export const AlbumsProvider = ({children}: childAlbumType): ReactElement => {
    const [albums] = useState<AlbumType[]>(initState)

    // useEffect(() =>{
    //     const fetchalbums = async (): Promise<AlbumType[]> =>{
    //         const data = await fetch('http://localhost:3500/albums').then(res => {
    //             return res.json()
    //         }).catch(err => {
    //             if(err instanceof Error) console.log(err.message)
    //         })
    //         return data
    //     }

    //     fetchalbums().then(albums => setAlbums(albums))
    // }, [])

    return(
        <AlbumsContext.Provider value = {{albums}}>
            {children}
        </AlbumsContext.Provider>
    )
}

export default AlbumsContext