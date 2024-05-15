import { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { buyFoodItem } from "../redux/slices/foodSlices";
import clock from "../assets/time.png"


function FoodCard(props:any) {

    const dispatch = useDispatch();

    const [buyData, setBuyData] = useState({
        name: '',
        price:props.food.price,
        phoneNo: '',
        foodId: props.food._id
    })

    const handleChange = (e:any) => {
      
        const {name, value} = e.target; 
        setBuyData({
            ...buyData,
            [name]: value
        })

    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const url = await dispatch(buyFoodItem(buyData))
        if (url.payload) {
            console.log("Redirecting to:", url.payload);
            window.location.href = url.payload;
          
        } else {
            console.error("URL not received from the backend");
        }
    }


    return(
        

        <div className="h-auto flex px-4 py-2 my-4 bg-[#f1f1f1] rounded-xl">
            
            <div className=" w-[33.33%]">
                <div className="font-medium">{props.food.name}</div>
                <div className="font-medium"> ₹ {props.food.price}</div>

                  <Popup trigger={<button className="h-7 text-white w-20  rounded-xl bg-[#FF8181]  px-2 my-2">Order</button>}
                   modal>
                          {/* BUY details DIV */}
                   <div className="h-96 w-80 rounded-3xl flex justify-center items-center flex-col bg-[#ffffff]">

                       <div className="h-16 w-72 flex justify-center items-center">
                            <div className=" font-bold text-lg">Place Order</div>
                       </div>


                        <div className="h-16 w-72 flex justify-center items-center">
                            <input type="text" name="name" value={buyData.name} onChange={handleChange} placeholder="Name" className="h-10 w-64 rounded-xl border border-[#CDCDCD] outline-none bg-[#F6F6F6] px-4"/>
                         </div>

                         <div className="h-16 w-72 flex justify-center items-center">
                            <input type="number" name="phoneNo" value={buyData.phoneNo} onChange={handleChange} placeholder="Phone No" className="h-10 w-64 rounded-xl border border-[#CDCDCD] outline-none bg-[#F6F6F6]  px-4"/>
                         </div>

                       <div className="h-16 w-72 flex justify-center items-center">
                             <button type="submit" className="h-10 text-white w-36  rounded-2xl bg-[#FF8181]  px-2 my-2" onClick={handleSubmit}>Place Order</button>
                        </div>

                     </div>
                </Popup> 


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
