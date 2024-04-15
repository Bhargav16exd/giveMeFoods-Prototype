
import { Route, Routes } from 'react-router-dom'
import FailedPage from './components/FailedPage'
import SuccessPage from './components/SuccessPage'
import MerchantDashboard from './components/MerchantDashboard'
import MenuPage from './components/MenuPage'

function App() {
 
  return (
    <>
      <Routes>

        <Route path='/menu' element={<MenuPage/>}></Route>

        <Route path='/payment/success' element={<SuccessPage/>} ></Route>
        <Route path='/payment/failed' element={<FailedPage/>} ></Route>

        <Route path='/merchantDashboard' element={<MerchantDashboard/>}></Route>




      </Routes>
       
    </>
  )
}

export default App
