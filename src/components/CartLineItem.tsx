import { ChangeEvent, ReactElement, memo } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
import { Button, Stack, Typography } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';

type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {
    const img: string = new URL(`../images/${item.id}.jpg`, import.meta.url).href

    const lineTotal: number = (item.qty * item.price)

    const highestQuantity: number = 20 > item.qty ? 20 : item.qty

    const optionValues: number[] = [...Array(highestQuantity).keys()].map(i => i+1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={'opt' + val} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty: Number(e.target.value)},
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item, 
    })

    const content = (
        <Stack className="cart_item" direction='row' border={1} spacing={2}>
            <img src={img} alt={item.name} height={200} width={200} style={{objectFit:'contain'}}/>
            <Stack flex={0.25} justifyContent='center' alignItems='center'>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="subtitle2">{item.artist}</Typography>
                <Typography variant="subtitle2">{item.category}</Typography>
            </Stack>
            <Stack flex={0.25} justifyContent='center' alignItems='center'>
                <div aria-label='Price Per Item'>
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}
                </div>
            </Stack>
            <Stack flex={0.25} justifyContent='center' alignItems='center'>
                <label htmlFor="itemQty" className="offscreen">
                    Item Quantity
                </label>
                <select name="ItemQty" id="itemQty" className="cart_select" value={item.qty} aria-label="Item Quantity" onChange={onChangeQty}>
                    {options}
                </select>
            </Stack>
            <Stack flex={0.25} justifyContent='center' alignItems='center'>
                <Typography>Price</Typography>
                <div className="cart_item-subtotal" aria-label="Line Item Subtotal">
                    {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)}
                </div>
            </Stack>

            <Button className="cart_button" variant="contained" color="error" aria-label="Remove Item from Cart" 
            title="Remove Item from Cart" onClick={onRemoveFromCart} sx={{borderRadius: '0'}}>
                <ClearIcon />
            </Button>
        </Stack>
    )


    return content
}

function areItemsEqual({item: prevItem}: PropsType, {item: nextItem}: PropsType) {
    return Object.keys(prevItem).every(key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const memoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)

export default memoizedCartLineItem
