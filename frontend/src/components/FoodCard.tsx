import { useState } from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import { buyFoodItem } from "../redux/slices/foodSlices";


function FoodCard(props:any) {

    const dispatch = useDispatch();

    const [buyData, setBuyData] = useState({
        name: '',
        price:props.price,
        phoneNo: '',
        foodId: props.id
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
        <div className="h-72 w-40 bg-[#3c3c3c] rounded-3xl shadow-md shadow-black flex justify-center items-center px-4 my-4 mx-2 sm:w-44">

            <div className="h-64 w-36 rounded-3xl flex flex-col justify-center items-center ">

                <div className="h-[60%] w-[100%]  rounded-3xl flex justify-center items-center ">
                    <img src={props.picture} className="h-full w-full rounded-3xl" alt="food"/>
                </div>

                <div className="h-16 w-36  rounded-b-3xl flex flex-col justify-center items-center">
                    <div className="text-white font-bold text-lg text-center ">{props.name}</div>
                    <div className="text-white font-bold text-lg">Rs. {props.price}</div>
                </div>

                <div>
                <Popup trigger={<button className=" text-white w-20 font-bold text-lg rounded-3xl bg-green-600 py-2 px-2 my-2">Buy</button>}
                            modal>
                            {/* BUY details DIV */}
                    <div className="h-96 w-80 rounded-3xl flex justify-center items-center flex-col  bg-[#3c3c3c] shadow-md shadow-black">

                        <div className="h-16 w-72 flex justify-center items-center">
                            <div className="text-white font-bold text-lg">Buy</div>
                        </div>

                        <div className="h-16 w-72 flex justify-evenly items-center">

                            <div className="text-white font-bold text-lg ">{props.name}</div>
                            <div className="text-white font-bold text-lg ">Rs .{props.price} </div>

                        </div>

                        <div className="h-16 w-72 flex justify-center items-center">
                            <input type="text" name="name" value={buyData.name} onChange={handleChange} placeholder="Name" className="h-10 w-64 rounded-3xl bg-[#1e1e1e] text-white px-4"/>
                        </div>

                        <div className="h-16 w-72 flex justify-center items-center">
                            <input type="number" name="phoneNo" value={buyData.phoneNo} onChange={handleChange} placeholder="Phone No" className="h-10 w-64 rounded-3xl bg-[#1e1e1e] text-white px-4"/>
                        </div>

                        <div className="h-16 w-72 flex justify-center items-center">
                            <button type="submit" className="h-10 w-64 rounded-3xl bg-green-600 text-white font-bold text-lg" onClick={handleSubmit}>Buy</button>
                        </div>

                    </div>
                </Popup>   
                </div>

                

            </div>
            
        </div>
    )
}

export default FoodCard;
