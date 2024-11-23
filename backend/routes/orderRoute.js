import express from 'express'
import { placeOrder,verifyOrder,userOrders,listOrders,updateStatus } from '../controller/orderController.js'
import { authMiddleware } from '../middlerware/auth.js'

const orderRoutes=express.Router()



orderRoutes.post("/place",authMiddleware,placeOrder)
orderRoutes.post("/verify",verifyOrder)
orderRoutes.post("/userorders",authMiddleware,userOrders)
orderRoutes.get("/list",listOrders)
orderRoutes.post("/status",updateStatus)
export {orderRoutes}