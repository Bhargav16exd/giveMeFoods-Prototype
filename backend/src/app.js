import express , {urlencoded} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Importing Routes
import userRouter from "./routes/userRegisterationRoute.js"



// Normal Express app
const app = express();


// Middleware
app.use(cookieParser())
app.use(urlencoded({extended: true}))
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.static('public'))
app.use(express.json({
    limit: '50mb'
}))



// Routes
app.use('/api/v1/admin', userRouter)





// Error Handling 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message ;
    const errors = err.errors || [];

    res.status(statusCode).json({
        success:false,
        message,
        errors ,
        data:null
    })
    next()
})

export default app;