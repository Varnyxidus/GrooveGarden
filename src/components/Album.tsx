import { memo, ReactElement } from "react"
import { AlbumType } from "../context/AlbumsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { IconButton, Stack, Typography, Box } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

type PropsType = {
    album: AlbumType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

const Album = ({album, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement =>{
    const img: string = new URL('./images/' + album.id + '.jpg', import.meta.url).href
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: {...album, qty: 1}})

    const itemInCart = inCart ? 'Item Added to Cart' : null

    const content = 
    <Stack className="album" direction='row' borderBottom={1}>
        <img src={img} alt={album.name} height={200} width={200} style={{objectFit:'contain'}}/>
        <Stack spacing={1} width={1100} sx={{padding:'10px'}} borderRight={1}>
            <Typography variant="h6">{album.name}</Typography>
            <Typography variant="body2">{album.artist}</Typography>
            <Typography variant="body2">{album.category}</Typography>
            <Typography variant="subtitle1">
                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(album.price)}
            </Typography>
            <Typography variant="body2" color="success">{itemInCart}</Typography>
        </Stack>
        <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', flex: 1}}>
            <IconButton onClick={onAddToCart} aria-label="Add to Cart" size="large" color="warning"><AddShoppingCartIcon/></IconButton>
        </Box>
    </Stack>

    return content
}

function areAlbumsEqual({album: prevAlbum, inCart: prevInCart}: PropsType, {album: nextAlbum, inCart: NextinCart}:PropsType){
    return (
        Object.keys(prevAlbum).every(key =>{
            return prevAlbum[key as keyof AlbumType] === nextAlbum[key as keyof AlbumType]
        }) && prevInCart === NextinCart
    )
}

const memoizedAlbum = memo<typeof Album>(Album, areAlbumsEqual)

export default memoizedAlbum
