import { Box, Typography } from "@mui/material"

const Footer = () => {
    const year: number = new Date().getFullYear()
    
    const pageContent =
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2196f3', height: '50px'}}>
        <Typography color="white">GrooveGarden &copy; {year}</Typography>
    </Box>

    const content = (
        <Box position='static' className="footer" sx={{marginTop: 'auto'}}>
            {pageContent}
        </Box>
    )

    return content
}

export default Footer