import { Request,Response,NextFunction } from "express";
import type { Resapi } from "../interfaces/interface.js";
import type { Incident } from "../interfaces/interface.js";
import { UPLOADSPATH } from "../models/models.js";
import { readData,writeData } from "../models/models.js";


export const getincidents=async (req:Request,res:Response,next:NextFunction)=>{
   try {
    let data:Incident[]=await readData()
//aceptar el filtrado via req.query de status y severity y ponerlos tambien en el front
    const {severity,status}=req.query
    
    if(!severity  && !status){
        //console.log('sin filtros************************************')
       // console.log(req.query)
        let resp:Resapi={
        success:true,
        message:'data loaded successfully',
        data
        }
        return res.status(200).json(resp)
    }


    let newseverity=String(severity).toUpperCase().trim()
    let newstatus=String(status).toUpperCase().trim()

    if(severity  && status ){
        
        const sendfilters=data.filter(el=>{
            if(el.severity === newseverity && el.status === newstatus){
                return el
            }
        })

        return res.status(200).json({
            success:true,
            message:'data loaded successfully',
            data:sendfilters
        })
        
    }

    if(severity){
        
        const sendseverity=data.filter(el=>el.severity === newseverity)
        return res.status(200).json({
            success:true,
            message:'data loaded successfully',
            data:sendseverity
        })
    }

    if(status){
        
        const sendstatus=data.filter(el=>el.status === newstatus)
        return res.status(200).json({
            success:true,
            message:'data loaded successfully',
            data:sendstatus
        })
    }

    
   } catch (error) {
    
    next(error)
   }
}

export const postincidents=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        //console.log(req.body)
        let data = await readData()
        let formfront=req.body
        let newformreceive:Incident={...formfront,attachmentUrl:`/uploads/${req.myfilename}`}
        //************en el front debo actualzar el valor para que la data se vea con el dato aumentado */
        let newdata=[...data,newformreceive]
        await writeData(newdata)
        
        res.status(200).json({
            success:true,
            message:'Incident added successfully',
            data:null
        })
    } catch (error) {
        next(error)
    }
    
}

export const patchstatus=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let data:Incident[]=await readData()
        let idincidence=req.params.id
        let {status}=req.body

        const searchincident=data.find(el=>el.id === idincidence)

        if(!searchincident){
            throw new Error(`cant find incident ${idincidence}`)
        }
        console.log(idincidence,status)
        let newdata=data.map(el=>{
            if(el.id === idincidence){
                return {
                    ...el,
                    status
                }
            }else{
                return el
            }
        })

        await writeData(newdata)
        res.status(200).json({
            success:true,
            message:'Change status success',
            data:null
        })
    } catch (error) {
        next(error)
    }
}

export const deleteincidents=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let data:Incident[] = await readData()
        const {id}=req.params


        const newdata=data.filter(el=>el.id !== id)

        await writeData(newdata)
        let resback:Resapi={
            success:true,
            message:'Success deleting id',
            data:null
        }
        res.status(200).json(resback)
    } catch (error) {
        next(error)
    }
}