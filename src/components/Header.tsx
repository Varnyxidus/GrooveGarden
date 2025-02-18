import Nav from "./Nav"
import { Typography, AppBar, Stack, Toolbar, Button} from "@mui/material"
import { Link } from "react-router-dom"

type PropsType = {
    viewCart: boolean,
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header = ({ viewCart, setViewCart}: PropsType) => {
    const content = (
        <AppBar position='static' className="header" color="primary">
            <Toolbar>
                <Typography variant="h5" component='div' sx={{flexGrow: 1}}>
                    <Link to='/' style={{textDecoration: 'none', color: "inherit"}}>
                        GrooveGarden
                    </Link>
                </Typography>
                <Stack direction='row' sx={{flexGrow: 1.2}}>
                    <Link to='/pop' style={{textDecoration: 'none', color: "inherit"}}>
                        <Button color="inherit">Pop</Button>
                    </Link>
                    <Link to='/rnb' style={{textDecoration: 'none', color: "inherit"}}>
                        <Button color="inherit">R&B</Button>
                    </Link>
                    <Link to='/hiphop' style={{textDecoration: 'none', color: "inherit"}}>
                        <Button color="inherit">Hiphop</Button>
                    </Link>
                </Stack>
                <Nav viewCart={viewCart} setViewCart={setViewCart} />
            </Toolbar>
        </AppBar>
    )

    return content
}

export default Header