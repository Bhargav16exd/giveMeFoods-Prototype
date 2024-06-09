
import { Route, Routes } from 'react-router-dom'
import FailedPage from './components/FailedPage'
import SuccessPage from './components/SuccessPage'
import MerchantDashboard from './components/MerchantDashboard'
import MenuPage from './components/MenuPage'
import LoginPage from './components/LoginPage'
import OrderStatusPage from './components/OrderStatusPage'
import CartPage from './components/CartPage'


function App() {


 
  return (
    <>
      <Routes>

        <Route path='/' element={<MenuPage/>}></Route>

        <Route path='/payment/success' element={<SuccessPage/>} ></Route>
        <Route path='/payment/failed' element={<FailedPage/>} ></Route>

        <Route path='/merchantDashboard' element={<MerchantDashboard/>}></Route>

        <Route path='/merchant/login' element={<LoginPage/>}></Route>

        <Route path='/order/status/:id' element={<OrderStatusPage/>}></Route>

        <Route path='/cart' element={<CartPage/>}> </Route>

        
        
      </Routes>
       
    </>
  )
}

export default App
