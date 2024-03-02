// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';

import connectDb from "./db/index.js";
import app from './app.js';

dotenv.config({
    path:'./env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
    })
    app.on('error',(error)=>{
        console.log("some error in the dbconnection then meathod",error);
        throw error;
    })
})
.catch((error)=>{
    console.log('SOME ERROR IN THE CONNECT DB MEATHOD');
})








// import express from 'express'
// const app=express();

// ( async()=>{
//     try {
//       await  mongoose.connect(`${process.env.MONGODB_URL}/
//         ${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("error on express",error);
//             throw error
//         });

//         app.listen(process.env.PORT,(error)=>{
//             console.log(`app is listening on port ${process.PORT}`);
//         })
//     } catch (error) {
//         console.error("error",error);
//         throw error;
//     }
// })()