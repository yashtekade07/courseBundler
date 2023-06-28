import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHanlder.js";
import {sendEmail} from "../utils/sendEmail.js"
import {Stats} from "../models/Stats.js"

export const contact=catchAsyncError(async(req,res,next)=>{
    const {name,email,message}=req.body;

    if(!name || !email ||!message) return next(new ErrorHandler("All fields are mandatory",400));
    
    const  to=process.env.MY_MAIL;
    const subject="Contact from CourseBundler";
    const text=`I am ${name} and my Email is ${email} .\n${message}`;
    await sendEmail(to,subject,text);

    res.status(200).json({
        success:true,
        message:"Your message has been sent",
    })
})
export const courseRequest=catchAsyncError(async(req,res,next)=>{
    const {name,email,course}=req.body;
    if(!name || !email ||!course) return next(new ErrorHandler("All fields are mandatory",400))
    const  to=process.env.MY_MAIL;
    const subject="Request for a course on CourseBundler";
    const text=`I am ${name} and my Email is ${email} .\n${course}`;
    await sendEmail(to,subject,text);

    res.status(200).json({
        success:true,
        message:"Your Request has been sent",
    })
})


export const getDashboardStats=catchAsyncError(async(req,res,next)=>{
    const stats= await Stats.find({}).sort({createdAt:"desc"}).limit(12);
    const statsData=[];
    const requiredSize=12-stats.length;

    for (let i = 0; i < stats.length; i++) {
         statsData.unshift(stats[i]);    
    }
    for (let i = 0; i < requiredSize; i++) {
        statsData.unshift({
            users:0,
            subscriptions:0,
            views:0,
        });      
    }
    const userCount=statsData[11].users;
    const subscriptionsCount=statsData[11].subscriptions;
    const viewsCount=statsData[11].views;

    let usersPercentage=true,viewsPercentage=true,subscriptionsPercentage=true;
    let usersProfit=true,viewsProfit=true,subscriptionsProfit=true;
    
    if(statsData[10].users===0){
        usersPercentage=userCount*100;
    }else{
            const diff=statsData[11].users-statsData[10].users;
            usersPercentage=(diff/statsData[10].users)*100;
            if(usersPercentage<0) usersProfit=false;
    }

    if(statsData[10].subscriptions===0){
        subscriptionsPercentage=subscriptionsCount*100;
    }else{
        const diff=statsData[11].subscriptions-statsData[10].subscriptions;
        subscriptionsPercentage=(diff/statsData[10].subscriptions)*100;
        if(subscriptionsPercentage<0) subscriptionsProfit=false;
    }

    if(statsData[10].views===0){
        viewsPercentage=viewsCount*100;
    }else{
        const diff=statsData[11].views-statsData[10].views;
        viewsPercentage=(diff/statsData[10].views)*100;
        if(viewsPercentage<0) viewsProfit=false;
    }
    
    res.status(200).json({
        success:true,
        stats:statsData,
        userCount,
        subscriptionsCount,
        viewsCount,
        subscriptionsPercentage,
        viewsPercentage,
        usersPercentage,
        subscriptionsProfit,
        viewsProfit,
        usersProfit,
    })
})