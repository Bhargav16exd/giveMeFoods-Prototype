import { useDispatch } from "react-redux"
import { decrementQuantity, incrementQuantity, removeItem } from "../redux/slices/CartSlice"

function CartCard(props:any){

    const dispatch = useDispatch()

    function handleInc(){
         dispatch(incrementQuantity(props.food))
    }
    function handleDec(){
         dispatch(decrementQuantity(props.food))
    }
    function handleRemove(){
        dispatch(removeItem(props.food))
    }


    return(
        <div className="h-auto flex px-4 py-2 my-4 bg-[#f1f1f1] rounded-xl">
            
        <div className=" w-[33.33%]">
            <div className="font-medium">{props.food.name}</div>
            <div className="font-medium"> ₹ {props.food.price}</div>


            <div className="flex">
                     <button className="mx-4" onClick={handleDec}>-</button>
                     <div className="font-medium"> {props.food.quantity}</div>
                     <button className="mx-4" onClick={handleInc}>+</button>
            </div>

            <button onClick={handleRemove}>Remove Item</button>
            



        </div>


        <div className=" w-[33.33%] flex items-center">
             
        </div>
        <div className=" w-[33.33%] flex justify-center items-center">
           <img src={props.food.picture} alt="food" className="h-16 w-24 rounded-3xl"/>  
        </div>

    </div>
    )
}

export default CartCard