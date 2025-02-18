import { createContext, ReactElement, useMemo, useReducer } from "react"

export type CartItemType = {
    id: string,
    name: string,
    artist: string,
    category: string,
    price: number,
    qty: number,
}

type CartStateType = { cart: CartItemType[]}

const initCartState: CartStateType = {cart : []}

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType,
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if(!action.payload){
                throw new Error('action.payload is missing in ADD action')
            }

            const {id, name, artist, category, price} = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)
            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            const qty: number = itemExists ? itemExists.qty + 1 : 1
            return {...state, cart: [...filteredCart, {id, name, artist, category, price, qty}]}
        }

        case REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload){
                throw new Error('action.payload is missing in REMOVE action')
            }

            const {id} = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            return {...state, cart: [...filteredCart]}
        }

        case REDUCER_ACTION_TYPE.QUANTITY: {
            if(!action.payload){
                throw new Error('action.payload is missing in QUANTITY action')
            }

            const {id, qty} = action.payload
            const itemExists: CartItemType | undefined = state.cart.find(item => item.id === id)

            if(!itemExists){
                throw new Error('Item must exist to update')
            }

            const updatedItem: CartItemType = {...itemExists, qty}

            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

            return {...state, cart: [...filteredCart, updatedItem]}
        }

        case REDUCER_ACTION_TYPE.SUBMIT: {
            return {...state, cart: []}
        }

        default: throw new Error('Unindentified Action')
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch]= useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems: number = state.cart.reduce((previousvalue, cartItem)=>{
        return previousvalue + cartItem.qty
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(
        state.cart.reduce((previousvalue, cartItem)=>{
            return previousvalue + (cartItem.qty * cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a,b) => {
        const itemA = Number(a.id.slice(-3))
        const itemB = Number(b.id.slice(-3))
        return itemA - itemB
    })

    return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

export type UseCartContext = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContext = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: '',
    cart: [],
}

export const CartContext = createContext<UseCartContext>(initCartContextState)

type ChildrenType = {children ?: ReactElement | ReactElement[]}

export const CartProvider =  ({children}: ChildrenType): ReactElement => {
    return(
        <CartContext.Provider value= {useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext