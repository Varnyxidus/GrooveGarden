import useCart from "../hooks/useCart"
import { useState } from "react"
import CartLineItem from "./CartLineItem"
import { Box, Button, Typography, Stack } from "@mui/material"

const Cart = () => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart} = useCart()

    const onSubmitOrder = () => {
        dispatch({type: REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }

    const pageContent = confirm ? <Typography variant="h1">Thank you for ordering!</Typography>
                    : <Box padding={'40px'} paddingBottom={0} sx={{height: '100%'}}>
                        <Typography className="offscreen" variant="h4" gutterBottom>Your Shopping Cart</Typography>
                        <ul className="cart" style={{padding: '0px', marginTop: '5px', marginBottom: '10px'}}>
                            {cart.map(item => {
                                return(
                                    <CartLineItem 
                                    key = {item.id}
                                    item = {item}
                                    dispatch = {dispatch}
                                    REDUCER_ACTIONS = {REDUCER_ACTIONS}
                                    />
                                )
                            })}
                        </ul>
                        <Stack color='white' className="cart_totals" border={1} spacing={1} maxWidth='200px' height={125} justifyContent='center' alignItems='center' borderRadius={2} sx={{backgroundColor: '#2196f3', marginLeft: 'auto'}}>
                            <Typography>Total Items: {totalItems}</Typography>
                            <Typography>Total Price: {totalPrice}</Typography>
                            <Button variant='contained' color="warning" className="cart_submit" disabled={!totalItems} onClick={onSubmitOrder} sx={{maxWidth:'150px'}}>
                                Place Order
                            </Button>
                        </Stack>
                    </Box>

    const content = (
        <main className="main main-cart">
            {pageContent}
        </main>
    )

    return content
}

export default Cart