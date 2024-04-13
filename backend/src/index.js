import dotenv from 'dotenv';
import app from './app.js';
import connectToDatabase from './database/db.js';

const PORT = process.env.PORT ;



// dotEnv Setup
dotenv.config(
    {path:'./env'}
);


// database connection

connectToDatabase()
.then(()=>{

    app.listen(PORT , ()=>{
      console.log(`Server started at port ${PORT}`)
    })

})
.catch((err)=>{
    console.log("Error in connecting to database : " , err)
})






