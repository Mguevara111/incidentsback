import express from 'express'
import { getincidents,postincidents,patchstatus,deleteincidents } from '../controllers/controllers.js'
import { uploadfile } from '../middlewares/middlewares.js'

export const giRouter=express.Router()

giRouter.get('/api/incidents',getincidents)
giRouter.post('/api/incidents',uploadfile.single('incidentfile'),postincidents)
giRouter.patch('/api/incidents/:id/status',patchstatus)
giRouter.delete('/api/incidents/:id',deleteincidents)