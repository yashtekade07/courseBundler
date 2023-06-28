import express from "express";
import {authorizeSubsribers, isAutheticated} from "../middlewares/auth.js"
import { buySubscription, cancelSubscription, getRazorpayKey, paymentVerification } from "../controllers/paymentController.js";
const router=express.Router({});

router.route('/subscribe').get(isAutheticated,buySubscription) // To Buy Subscription
router.route('/paymentverification').post(isAutheticated,paymentVerification) // For Payment Verification and saving reference in database
router.route('/razorpaykey').get(getRazorpayKey) // To Get Razorpay Key
router.route('/subscribe/cancel').delete(isAutheticated,authorizeSubsribers,cancelSubscription)


export default router;