import { useEffect, useState } from 'react';
import io from 'socket.io-client';


function MerchantDashboard() {

    type order = {
        name:string,
        phoneNo:number,
        foodId:string,
        orderStatus:string
    }

    const [orders, setOrders] = useState<order[]>([]);

    console.log(orders)

    useEffect(() => {

        const socket = io('http://localhost:8090' , {
        auth:{
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWE4ZjcyOWVhNzQxNjgzZTNmNjdkNyIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcxMzE1NjYwNSwiZXhwIjoxNzEzNzYxNDA1fQ.ULrxS0CSuzrD7UY7lgHUcUKxPUtH9LQHRL6WjbWhB2w'
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
