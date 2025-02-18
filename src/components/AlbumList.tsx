import useCart from "../hooks/useCart"
import useAlbums from "../hooks/useProduct"
import { ReactElement } from "react"
import Album from "./Album"

const AlbumList = (tipe: number) => {
    const {dispatch, REDUCER_ACTIONS, cart} = useCart()
    const {albums} = useAlbums()

    const popalbums = albums?.filter(albums => albums.category === "Pop") || []
    const hiphopalbums = albums?.filter(albums => albums.category === "Hiphop") || []
    const rnbalbums = albums?.filter(albums => albums.category === "R&B") || []

    let pageContent, popContent, hipContent, rnbContent: ReactElement | ReactElement[] = <p>Loading...</p>

    if(albums?.length){
        pageContent = albums.map(album =>{
            const inCart: boolean = cart.some(item => item.id === album.id)

            return (
                <Album 
                    key = {album.id}
                    album = {album}
                    dispatch = {dispatch}
                    REDUCER_ACTIONS = {REDUCER_ACTIONS}
                    inCart = {inCart}
                />
            )
        })

        popContent = popalbums.map(album =>{
            const inCart: boolean = cart.some(item => item.id === album.id)

            return (
                <Album 
                    key = {album.id}
                    album = {album}
                    dispatch = {dispatch}
                    REDUCER_ACTIONS = {REDUCER_ACTIONS}
                    inCart = {inCart}
                />
            )
        })

        hipContent = hiphopalbums.map(album =>{
            const inCart: boolean = cart.some(item => item.id === album.id)

            return (
                <Album 
                    key = {album.id}
                    album = {album}
                    dispatch = {dispatch}
                    REDUCER_ACTIONS = {REDUCER_ACTIONS}
                    inCart = {inCart}
                />
            )
        })

        rnbContent = rnbalbums.map(album =>{
            const inCart: boolean = cart.some(item => item.id === album.id)

            return (
                <Album 
                    key = {album.id}
                    album = {album}
                    dispatch = {dispatch}
                    REDUCER_ACTIONS = {REDUCER_ACTIONS}
                    inCart = {inCart}
                />
            )
        })
    }

    if(tipe === 1){
        const content = (
            <main className="main main-albums">
                {popContent}
            </main>
        )
        return content
    }else if(tipe === 2){
        const content = (
            <main className="main main-albums">
                {rnbContent}
            </main>
        )
        return content
    }else if(tipe === 3){
        const content = (
            <main className="main main-albums">
                {hipContent}
            </main>
        )
        return content
    }else{
        const content = (
        <main className="main main-albums">
            {pageContent}
        </main>
        )
        return content
    }
}
export default AlbumList