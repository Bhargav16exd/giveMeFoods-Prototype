import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import io from 'socket.io-client'



function MerchantDashboard() {

    type order = {
        orderName:string,
        customerName:string,
        createdAt:string
        quantity:number
        _id:string,
        orderStatus:string,
        items:any
    }
    
    
    const [orders, setOrders] = useState<order[]>([]);
    const [distinctOrders, setDistinctOrders] = useState<any[]>([]);
    const token = useSelector((state:any)=> state.authenticationDetails?.token)
    const navigate = useNavigate()
    
    useEffect(() => {

        const socket = io('http://localhost:8010' , {
        auth:{
        token:token
        }
        }); 

        socket.on('allOrders', (orderData) => {
            console.log("sokcet called" , orderData)
            setOrders(orderData.ordersWithAMPM);
            setDistinctOrders(orderData.distinctOrders);
        });

        socket.on('connect_error', (error) => {
            if (error.message === "Unauthorized") {
                navigate('/merchant/login')
            }
        });
    

        return () => {
            socket.disconnect();
        };
    }, []);

    // function handleConfirmOrder(orderId:string){
    //     console.log("Order Confirmed",orderId)
    // }


    return (
        <div>
            <div className='h-[10vh] flex justify-center items-center '>
                  <h1 className='text-5xl font-normal'>CreamyNuts</h1>
            </div>
            

            <div className='h-auto  py-10'>
            {
               distinctOrders && distinctOrders.map((order) => {
                    return (
                        <div key={order._id} className='h-auto my-6 mx-4 bg-[#F2F2F2] rounded-xl'>
                        
                           <div className='px-5 py-4 text-lg font-semibold'>{order.name}</div>

                           <div className='flex  text-base'>
                                       <div className=' w-[20%] px-5 my-2'>
                                        Customer Name
                                       </div>
                                       <div className=' w-[20%] flex justify-center items-center'>
                                        Order Time
                                       </div>
                                       <div className=' w-[20%] flex justify-center items-center '>
                                        Quantity
                                       </div>
                                       <div className=' w-[20%] flex justify-center items-center '>
                                        Status
                                       </div>
                                       <div className=' w-[20%] flex justify-center items-center'>
                                        
                                       </div>
                           </div>


                            {
                                orders && orders.map((orderData,index) => {

                                    console.log(orderData)

                                    return(
                                        orderData.items.map((item:any)=>{

                                            if(item.foodId === order._id){
                                                return(
                                                    <div key={index} className='border-t h-auto  text-xl  flex'>

                                                <div className=' w-[20%] px-5 py-3'>
                                                   {orderData.customerName}
                                                </div>
                                                <div className=' w-[20%] py-3 flex justify-center items-center'>
                                                   {orderData.createdAt }
                                                </div>
                                                <div className=' w-[20%] py-3 flex justify-center items-center'>
                                                    {item.quantity}
                                                </div>
                                                <div className=' w-[20%] py-3 flex justify-center items-center'>
                                                    {item.orderStatus == 'PENDING' ?
                                                      
                                                      <span className='text-red-500'>{item.orderStatus}</span> :

                                                        <span className='text-yellow-500'>{item.orderStatus}</span>
                                                    
                                                    }
                                                </div>
                                                <div className=' w-[20%] py-3 '>

                                                     <Popup trigger={<button className='bg-red-500 text-white px-3 py-1 rounded-3xl'>Deliver</button>} modal >
                                                            {/* BUY details DIV */}
                                                            <div className="h-96 w-80 rounded-3xl flex justify-center items-center flex-col bg-red-100">


                                                            </div>
                                                      </Popup> 
                                        
                                                </div>
                                            </div>
                                               )
                                            }
                                            
                                        }) 
                                    )


                                })
                            }
                            
                        </div>
                    )
                })
            }
            </div>


        </div>
        
    );
}

export default MerchantDashboard;
