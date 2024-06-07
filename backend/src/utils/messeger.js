
import axios from "axios";

async function messeger(orderData){

    console.log(orderData.OTP)

    const url = 'https://graph.facebook.com/v19.0/346687115194469/messages'
    const token = 'EAALjBQVZAPskBO5v3yJSMtQDkgX0dZAto4JvY7MQt2vEum1xY4SY1g0GZCFR8e6uQayDHBdZAr7AgynGvtI4ZChRikqUy4YDeuZAxZApGH7DfS9sfR89vn8ZBtVDbX2omZBKDb0LhezBWhMhqbdy3of0JBduJxH6RJVaXkw880tglOZBI8Tcyw1ohar9IZBTfD1d0BaiRpuwIMOyh5ssrIftensFeAy6StJzkU4jm0ZD'
    const recipientPhoneNumber = orderData.phoneNo
    const messageContent = 
    `Hello ${orderData.customerName} , Thank You for confirming the order of Rs ${orderData.price} . OTP is ${orderData.OTP} 
     Check your order status here http://localhost:5173/order/status/${orderData._id} 
     onlyfriends.in
    ` 

    
   const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhoneNumber,
    type: 'text',
    text: {
      preview_url: true,
      body: messageContent
    }
   }

   const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await axios.post(url, data, config);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
    

}

export {
    messeger
}