import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listFoodItems } from '../redux/slices/foodSlices';

function MenuPage(){

    const dispatch = useDispatch()
    const menu = useSelector((state: any) => state?.listFood?.food)  
    const loading = useSelector((state: any) => state?.listFood?.loading)  
    console.log(menu,loading)

    useEffect(()=>{
      dispatch(listFoodItems() as any)
    },[])

    return(
        <div>
            <h1>Menu Page</h1>
        </div>
    )
}

export default MenuPage; 