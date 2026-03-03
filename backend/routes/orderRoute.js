import express from "express";
import {
    placeOrder,
    userOrders,
    allOrders,
    updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// INFO: Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// INFO: Payment Features
orderRouter.post("/place", authUser, placeOrder);

// INFO: User Features
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
