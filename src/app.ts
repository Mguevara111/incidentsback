import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { ErrorRequestHandler } from 'express'
import type { Resapi } from './interfaces/interface.js'
import { giRouter } from './routes/index.js'

const PORT = process.env.PORT || 3000;
const app=express()
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const PUBLICPATH=path.join(__dirname,'../public')

app.use(cors({
    origin:'*',
    methods:['GET','POST','PATCH','DELETE'],
    credentials:true
}))
app.use(express.static(PUBLICPATH))
app.use(express.json())

app.use('/api',giRouter)

const Errorh:ErrorRequestHandler=(err,req,res,next)=>{
    let message=err.message || 'General Error'
   const statusCode = typeof err.status === 'number' ? err.status : 500;
    let sendres:Resapi={
        success:false,
        message,
        data:null
    }
    res.status(statusCode).json(sendres)
}

app.use(Errorh)

app.listen(PORT,()=>{
    console.log(`server ready at http://127.0.0.1:${PORT}`)
})
