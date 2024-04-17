import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { handleLoginFunction } from "../redux/slices/authSlices"

function LoginPage(){

    const [loginData , setLoginData] = useState({
        userId:'',
        password:''
    })
     
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleChange(e:any){
          const {name , value} = e.target
           setLoginData({
            ...loginData,
            [name]:value
           })    
    }

    async function handleSubmit(e:any){
                  
        e.preventDefault()
        const res = await dispatch(handleLoginFunction(loginData))
        console.log(res.payload)
        if(res.payload.statusCode == 200 && res.payload.success == true){
            navigate('/merchantDashboard')
        }
        
    }

    return(
        <div className="w-screen h-screen bg-[#1e1e1e] flex justify-center items-center ">

                 {/* Main login Div  */}
                 <div className="h-96 w-80 rounded-3xl shadow-black shadow-lg flex justify-center items-center flex-col">

                 <div className="h-16 w-72 flex justify-center items-center">
                            <input type="text" name="userId" value={loginData.userId} onChange={handleChange} placeholder="Name" className="h-10 w-64 rounded-3xl bg-[#1e1e1e] text-white px-4"/>
                        </div>

                        <div className="h-16 w-72 flex justify-center items-center">
                            <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Phone No" className="h-10 w-64 rounded-3xl bg-[#1e1e1e] text-white px-4"/>
                        </div>

                        <div className="h-16 w-72 flex justify-center items-center">
                            <button type="submit" className="h-10 w-64 rounded-3xl bg-green-600 text-white font-bold text-lg" onClick={handleSubmit}>Login</button>
                        </div>

                 </div>
        </div>
    )
}

export default LoginPage