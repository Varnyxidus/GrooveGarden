import Header from "../components/Header"
import Footer from "../components/Footer"
import Cart from "../components/Cart"
import AlbumList from "../components/AlbumList"
import { useState } from "react"
import { Box } from "@mui/material"

const Pop = () => {
const [viewCart, setViewCart] = useState<boolean>(false)
  let genre: number = 1
  const pagecontent = viewCart ? <Cart /> : AlbumList(genre)

  const content = (
    <Box>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pagecontent}
      <Footer/>
    </Box>
  )

  return content
};

export default Pop;