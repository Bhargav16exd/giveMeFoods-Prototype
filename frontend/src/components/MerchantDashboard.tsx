import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';


function MerchantDashboard() {

    type order = {
        orderName:string,
        customerName:string,
        createdAt:string
        quantity:number
        foodId:string,
        orderStatus:string
    }
    
    const [orders, setOrders] = useState<order[]>([]);
    const [distinctOrders, setDistinctOrders] = useState<any[]>([]);
    const token = useSelector((state:any)=> state.authenticationDetails?.token)


    console.log(orders)
    console.log(distinctOrders)
  

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

        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <div>
            <div className='h-[10vh] flex justify-center items-center '>
                  <h1 className='text-5xl font-normal'>CreamyNuts</h1>
            </div>
            

            <div className='h-auto  py-10'>
            {
               distinctOrders && distinctOrders.map((order,index) => {
                    return (
                        <div key={index} className='h-auto my-6 mx-4 bg-[#F2F2F2] rounded-xl'>
                        
                           <div className='px-5 py-4 text-lg font-semibold'>{order}</div>

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
                                    if(orderData.orderName === order){
                                        return (
                                            <div key={index} className='border-t h-auto  text-xl  flex'>

                                                <div className=' w-[20%] px-5 py-3'>
                                                   {orderData.customerName}
                                                </div>
                                                <div className=' w-[20%] py-3 flex justify-center items-center'>
                                                   {orderData.createdAt }
                                                </div>
                                                <div className=' w-[20%] py-3 flex justify-center items-center'>
                                                    {orderData.quantity}
                                                </div>
                                                <div className=' w-[20%] py-3 flex justify-center items-center'>
                                                    {orderData.orderStatus == 'Pending' ?
                                                      
                                                      <span className='text-red-500'>{orderData.orderStatus}</span> :

                                                        <span className='text-yellow-500'>{orderData.orderStatus}</span>
                                                    
                                                    }
                                                </div>
                                                <div className=' w-[20%] py-3 '>
                                        
                                                 </div>
                                            </div>
                                        )
                                    }
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
