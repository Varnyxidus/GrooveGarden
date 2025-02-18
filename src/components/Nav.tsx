import { Button } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AlbumIcon from '@mui/icons-material/Album';

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Nav = ({ viewCart, setViewCart}: PropsType) => {
    const button = viewCart 
                ? 
        (<Button variant="contained" color="warning" onClick={() => setViewCart(false)}>
            {<AlbumIcon />}
        </Button>)
                : 
        (<Button variant="contained" color='warning' onClick={() => setViewCart(true)}>
            {<ShoppingCartIcon />}
        </Button>)

    const content = <nav className="viewbutton">{button}</nav>

    return content
}

export default Nav