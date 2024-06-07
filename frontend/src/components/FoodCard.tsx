
import { useDispatch } from "react-redux";
import clock from "../assets/time.png"
import { addItemToCart } from "../redux/slices/CartSlice";


function FoodCard(props:any) {

    const dispatch = useDispatch() 

   function handleClick(){
        dispatch(addItemToCart(props.food))
   }
   


    return(
        

        <div className="h-auto flex px-4 py-2 my-4 bg-[#f1f1f1] rounded-xl">
            
            <div className=" w-[33.33%]">
                <div className="font-medium">{props.food.name}</div>
                <div className="font-medium"> ₹ {props.food.price}</div>

                <button className="h-7 text-white w-auto  rounded-xl bg-[#FF8181]  px-2 my-2" onClick={handleClick}>Add to cart</button>

                


            </div>


            <div className=" w-[33.33%] flex items-center">
                 <div className="font-thin text-base flex items-center"><span><img src={clock} className="h-4 w-4 mx-2"/></span> :{props.food.time} Min</div>
            </div>
            <div className=" w-[33.33%] flex justify-center items-center">
               <img src={props.food.picture} alt="food" className="h-16 w-24 rounded-3xl"/>  
            </div>

        </div>
    )
}

export default FoodCard;
