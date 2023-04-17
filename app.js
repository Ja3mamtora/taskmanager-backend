const express = require('express')
const app=express();
const tasks=require('./Routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()
const errorHandlerMiddleware=require('./middleware/error-handler')
const notFound=require('./middleware/not-found')


app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


const start=async()=>{
    try {
        await connectDB(process.env.uri)
        app.listen(process.env.port||8000,()=>{
            console.log("Listening..");
        })
    } catch (error) {
        console.log(error)  
    }
}

start()
