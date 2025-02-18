import { useContext } from "react"
import AlbumsContext from "../context/AlbumsProvider"
import { AlbumContextType } from "../context/AlbumsProvider"

const useAlbums = (): AlbumContextType =>{
    return useContext(AlbumsContext)
}

export default useAlbums
