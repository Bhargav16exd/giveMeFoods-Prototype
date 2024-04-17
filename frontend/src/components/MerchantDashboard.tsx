import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';


function MerchantDashboard() {

    type order = {
        name:string,
        phoneNo:number,
        foodId:string,
        orderStatus:string
    }

    const [orders, setOrders] = useState<order[]>([]);
    const token = useSelector((state:any)=> state.authenticationDetails?.token)


    console.log(orders)
  

    useEffect(() => {

        const socket = io('http://localhost:8010' , {
        auth:{
        token:token
        }
        }); 

        socket.on('allOrders', (orderData) => {
            setOrders(orderData);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        <div>
            <h1>Merchant Dashboard</h1>
            <h2>Orders</h2>
            <ul>
                {orders.map((order:order , index) => (
                    <li key={index}>
                        Name: {order.name}, Phone: {order.phoneNo}, Item: {order.foodId}, Status: {order.orderStatus}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MerchantDashboard;
