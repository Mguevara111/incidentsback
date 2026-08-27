import { writeFile,readFile,unlink } from "node:fs/promises";
import path from 'path'
import { fileURLToPath } from 'url'
import type { Incident } from "../interfaces/interface.js";


const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
const DATAPATH=path.join(__dirname,'../data/data.json')
export const UPLOADSPATH=path.join(__dirname,'../../public/uploads')

export const readData=async ()=>{
    let data=await readFile(DATAPATH,'utf8')

    if(!data) throw new Error('Cant get data from dataread')

    return JSON.parse(data)
}

export const writeData=async (newincidents:Incident[])=>{
    await writeFile(DATAPATH,JSON.stringify(newincidents),'utf8')

    console.log('data write')
}

export const deleteFile=async (filename:string)=>{
    //recibe un string del nombre del archivo
    let filepath=path.join(UPLOADSPATH,filename)
    await unlink(filepath)

    console.log('delete file')
}