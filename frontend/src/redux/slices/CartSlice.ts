import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    itemsCount:JSON.parse(localStorage.getItem('itemsCount') || '0')
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItemToCart: (state,action)=>{
            
            const item = action.payload;
            
            const existingItem = state.cart.find((cartItem:any)=>cartItem._id === item._id)
            
            if(existingItem){
                console.log(true)
                existingItem.quantity += 1;
            }
            else{
                state.cart.push({...item,quantity:1})
            }

            state.itemsCount = state.cart.reduce((total:any,cartItem:any)=>total + cartItem.quantity,0)
            localStorage.setItem('itemsCount',JSON.stringify(state.itemsCount))
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        removeItem: (state,action)=>{
          
            const item = action.payload
            state.cart = state.cart.filter((cartItem:any)=>cartItem._id != item._id)
            
            state.itemsCount = state.cart.reduce((total:any,cartItem:any)=>total + cartItem.quantity,0)
            localStorage.setItem('itemsCount',JSON.stringify(state.itemsCount))
            localStorage.setItem('cart',JSON.stringify(state.cart))

        },
        incrementQuantity: (state,action)=>{
            const item = action.payload;
            
            const existingItem = state.cart.find((cartItem:any)=>cartItem._id === item._id)
            
            if(existingItem){
                existingItem.quantity += 1;
            }

            state.itemsCount = state.cart.reduce((total:any,cartItem:any)=>total + cartItem.quantity,0)
            localStorage.setItem('itemsCount',JSON.stringify(state.itemsCount))
            localStorage.setItem('cart',JSON.stringify(state.cart))
        
        },
        decrementQuantity: (state,action)=>{
            const item = action.payload;
            
            const existingItem = state.cart.find((cartItem:any)=>cartItem._id === item._id)
            
            if(existingItem.quantity>1){
                existingItem.quantity -= 1;
            }

            state.itemsCount = state.cart.reduce((total:any,cartItem:any)=>total + cartItem.quantity,0)
            localStorage.setItem('itemsCount',JSON.stringify(state.itemsCount))
            localStorage.setItem('cart',JSON.stringify(state.cart))
        
        }

    }
})



export const { addItemToCart,incrementQuantity,decrementQuantity,removeItem } = cartSlice.actions;
export default cartSlice.reducer;