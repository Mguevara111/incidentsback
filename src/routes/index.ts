import express from 'express'
import { getincidents,postincidents,patchstatus,deleteincidents } from '../controllers/controllers.js'
import { uploadfile } from '../middlewares/middlewares.js'

export const giRouter=express.Router()

giRouter.get('/incidents',getincidents)
giRouter.post('/incidents',uploadfile.single('incidentfile'),postincidents)
giRouter.patch('/incidents/:id/status',patchstatus)
giRouter.delete('/incidents/:id',deleteincidents)