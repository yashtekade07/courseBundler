import express from "express";
import {authorizeadmin, isAutheticated} from "../middlewares/auth.js"
import { contact, courseRequest, getDashboardStats } from "../controllers/otherController.js";
const router=express.Router({});

router.route('/contact').post(contact); // contact form
router.route('/courserequest').post(courseRequest); //request form
router.route('/admin/stats').get(isAutheticated,authorizeadmin,getDashboardStats);//Get Admin Dashboard Stats



export default router;