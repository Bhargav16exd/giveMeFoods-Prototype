import { Link } from "react-router-dom";


function FoodCard(props:any) {


    console.log(props)

  

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
                    <Link to={`/buy/${props.id}`}>
                    <button className=" text-white w-20 font-bold text-lg rounded-3xl bg-green-600 py-2 px-2 my-2">Buy</button>
                    </Link>
                </div>

            </div>
            
        </div>
    )
}

export default FoodCard;2