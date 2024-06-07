import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { checkOrderStatus } from "../redux/slices/foodSlices"

function OrderStatusPage(){

    const id = useParams()
    const dispatch = useDispatch()
    const order = useSelector((state: any) => state?.listFood?.orderStatus)

    async function getOrderStatus(){
     await dispatch(checkOrderStatus(id.id) as any)

    }

    useEffect( ()=>{
       getOrderStatus()
    },[])

    console.log(order)

    return(
        <>
 
        <div>{order.customerName}</div> 
        <div>{order.orderName}</div> 
        <div>{order.orderStatus}</div>  
        <div>{order.price}</div> 
        
        </>
    )
}

export default OrderStatusPage