import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listFoodItems } from '../redux/slices/foodSlices';
import FoodCard from './FoodCard';
import searchh from '../assets/search.png' 


function MenuPage(){

    const dispatch = useDispatch()
    const menu = useSelector((state: any) => state?.listFood?.food) 
    const category = useSelector((state: any) => state?.listFood?.category)  
    const loading = useSelector((state: any) => state?.listFood?.loading)  
    console.log(category)

    useEffect(()=>{
      dispatch(listFoodItems() as any)
    },[])

    return(
        <div className='min-h-screen w-screen bg-[#E8E8E8]'>

            {/* Nav Div  */}
             <div className=' py-4 flex justify-center items-center h-[10vh] '>
                        
                        
                        <h1 className='text-xl font-medium'>Creamy Nuts</h1>

                        {/* <Link to={'/merchant/login'}>
                        <div className="w-72 flex justify-center items-center relative right-[-150%]">
                            <button type="submit" className="h-10 w-40 rounded-3xl bg-green-600 text-white font-bold text-lg " >Login</button>
                        </div>
                        </Link> */}
                        

             </div>
            

             {/* welcome and serarch div  */}
             <div className='h-72 w-screen sm:flex sm:justify-center sm:items-center sm:flex-col mb-4'>
                
                   <div className='h-auto my-2 px-4 py-1 w-screen sm:flex sm:justify-center sm:items-center sm:flex-col  '>
                         <div className='font-semibold'>Welcome,</div>
                         <div >Order Anything at ease!</div>
                   </div>


                   <div className="h-10 bg-[#f3f3f3] rounded-3xl flex mx-4 my-4  shadow-md sm:w-96" >
                    <div className="w-16  flex items-center justify-center cursor-pointer" >
                    <img src={searchh} alt="" className="h-6 w-6 "/>
                    </div>
                    <input 
                    type="text" 
                    name="" 
                    id="" 
                    className="h-10  bg-[#f3f3f3] px-4 rounded-3xl focus:outline-none  text-black placeholder-black  "
                    placeholder="Search"
                    />
                  </div>
                   
                  <div className='font-semibold mx-4 my-6'>Most Popular</div> 

                  <div className='flex justify-evenly items-center w-screen'>

                    <div className='bg-[#D9D9D9] h-24 w-36 rounded-3xl sm:h-44 sm:w-60'></div>
                    <div className='bg-[#D9D9D9] h-24 w-36 rounded-3xl sm:h-44 sm:w-60'></div>
                     
                  </div>


             </div>

            {/* Menu Div */}

            <div className='h-auto w-screen my-2 px-2 flex justify-center items-center flex-col'>
                 {loading ? <div>Loading...</div> : category.map((category: any) =>{
                
                 return(
                 <div className=' h-[50%] w-full my-2' key={category}>
                    
                    <div className='h-8 px-4 flex justify-start items-center font-medium'>{category}</div>

                    {menu.map((food:any) => (food.category === category ? <FoodCard key={food._id} food={food} /> : null))}
                
                 </div>
                 
                )})}
           
              
            </div>

            
            
            
        </div>
    )
}

export default MenuPage; 