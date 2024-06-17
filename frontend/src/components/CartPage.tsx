import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartCard from "./CartCard";
import Popup from "reactjs-popup";
import { buyFoodItem } from "../redux/slices/foodSlices";



function CartPage(){


    const dispatch = useDispatch()
    const cart = useSelector((state:any)=>state.cartData.cart)
    const [confirmUI , setConfirmUI] = useState(true)
    const [cartEmpty , setCartEmptyState] = useState(false)
    const [cartTotal , setCartTotal] = useState(0)

    console.log("Cart",cart)

    const [buyData, setBuyData] = useState({
        name: '',
        phoneNo: '',
        items:[]
    })

    const handleChange = (e:any) => {
      
        const {name, value} = e.target; 
        setBuyData({
            ...buyData,
            [name]: value
        })

    }

    const handleSubmit = () => {
          
        // Cart total validator 
        if(cartTotal < 50){
            alert("Minimum order amount should be 150")
            return
        }

        if(buyData.name === '' || buyData.phoneNo === '' ){
            alert("Please fill the form")
            return
        }
        else if(buyData.phoneNo.length !== 10){
            alert("Phone number should be of 10 digits")
            return
        }

        setConfirmUI(false)
    }

    const handleSubmit1 = () => {
        setConfirmUI(true)
    }

    const handleSubmitt = async (e:any) => {

        e.preventDefault();
        
        const url = await dispatch(buyFoodItem(buyData))
        if (url.payload) {
            console.log("Redirecting to:", url.payload);
            window.location.href = url.payload;
          
        } else {
            console.error("URL not received from the backend");
        }
    }

    useEffect(() => {
        const items = cart.map((cartItem: any) => ({
            foodId: cartItem._id,
            quantity: cartItem.quantity
        }));

        setBuyData((prevBuyData) => ({
            ...prevBuyData,
            items: items
        }));

        const total = cart.reduce((total:any,cartItem:any)=>total + cartItem.price * cartItem.quantity,0)
        setCartTotal(total)
    }, [cart]);

    
    useEffect(()=>{
        if(cart.length>0){
            setCartEmptyState(false)
            console.log("cart is not empty")
        }
        else{
            setCartEmptyState(true) 
            console.log("cart is empty")
        }
    },[cart])



    return(
        <>
          {
            cartEmpty ? <div> Cart is Empty </div> :
            <div className="h-auto px-4 border ">

                <div>
                    <h1 className="text-2xl font-bold my-4  text-center">Cart</h1>
                </div>
                
                {
                    cart.map((cartItem:any)=> <CartCard key={cartItem._id} food={cartItem} />)
                }

                

                <Popup 
                trigger={<div className="flex border  bg-red-400 py-1 px-4 rounded-lg  text-white justify-center items-center cursor-pointer" >
                    <h1 className="text-2xl font-bold my-4 mx-4  text-center">Order Now</h1>
                    <h1 className="text-2xl font-bold my-4  text-center">Total: {cartTotal}</h1>
                </div>}

                   modal>
                          {/* BUY details DIV */}
                   <div className="h-96 w-80 rounded-3xl flex justify-center items-center flex-col bg-red-100">

                       <div className="h-16 w-72 flex justify-center items-center">
                            <div className=" font-bold text-lg">Place Order</div>
                       </div>

                       {
                          confirmUI ? <>

                            <div className="h-16 w-72 flex justify-center items-center">
                                <input type="text" name="name" value={buyData.name} onChange={handleChange} placeholder="Name" className="h-10 w-64 rounded-xl border border-[#CDCDCD] outline-none bg-[#F6F6F6] px-4"/>
                            </div>

                            <div className="h-16 w-72 flex justify-center items-center">
                                <input type="number" name="phoneNo" value={buyData.phoneNo} onChange={handleChange} placeholder="Phone No" className="h-10 w-64 rounded-xl border border-[#CDCDCD] outline-none bg-[#F6F6F6]  px-4"/>
                            </div>

                            <div className="h-16 w-72 flex justify-center items-center">   
                                <button type="submit" className="h-10 text-white w-36  rounded-2xl bg-[#FF8181]  px-2 my-2" onClick={handleSubmit}>Confirm</button>
                            </div> 
                            
                            </> :
                            <>

                            <div className="h-16 w-72 flex justify-center items-center">
                                <h1>Name : {buyData.name}</h1>
                            </div>

                            <div className="h-16 w-72 flex justify-center items-center">
                                <h1>Phone No : {buyData.phoneNo}</h1>
                            </div>

                            <div className="h-16 w-72 flex justify-center items-center">   
                                <button type="submit" className="h-10 text-white w-32 mx-4  rounded-2xl bg-[#FF8181]  px-2 my-2" onClick={handleSubmit1}>Edit</button>
                                <button type="submit" className="h-10 text-white w-32 mx-4  rounded-2xl bg-[#FF8181]  px-2 my-2" onClick={handleSubmitt}>Place Order</button>
                            </div>
                            
                            </>
                       }
                        

                     </div>
                </Popup> 
            
            </div>
          }
        </>
    )
}

export default CartPage;

