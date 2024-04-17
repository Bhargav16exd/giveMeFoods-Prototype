import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listFoodItems } from '../redux/slices/foodSlices';
import FoodCard from './FoodCard';
import { Link } from 'react-router-dom';

function MenuPage(){

    const dispatch = useDispatch()
    const menu = useSelector((state: any) => state?.listFood?.food)  
    const loading = useSelector((state: any) => state?.listFood?.loading)  
    console.log(menu,loading)

    useEffect(()=>{
      dispatch(listFoodItems() as any)
    },[])

    return(
        <div className='min-h-screen w-screen bg-[#1e1e1e]'>

            {/* Nav Div  */}
             <div className='text-white font-bold text-4xl py-4 flex justify-center items-center h-[10vh] '>
                        
                        
                        <div className='relative right-[-10%]'>Menu</div>

                        <Link to={'/merchant/login'}>
                        <div className="w-72 flex justify-center items-center relative right-[-150%]">
                            <button type="submit" className="h-10 w-40 rounded-3xl bg-green-600 text-white font-bold text-lg " >Login</button>
                        </div>
                        </Link>

             </div>

            {/* Menu Div */}

            <div className='min-h-[90vh] flex flex-wrap justify-evenly items-center '>
                 {loading ? <div>Loading...</div> : menu.map((food: any) => {
                        return <FoodCard key={food._id} name={food.name} picture={food.picture} price={food.price} id={food._id} />
                    })}
           
              
            </div>

            
            
            
        </div>
    )
}

export default MenuPage; 