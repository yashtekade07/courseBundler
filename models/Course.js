import mongoose  from "mongoose";

const Schema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Enter Course Title"],
        minLength:[4,"Title must be atleast 4 Characters"],
        maxLength:[80,"Title must be atleast 80 Characters"],
    },
    description:{
        type:String,
        required:[true,"Please Enter Course description"],
        minLength:[20,"Description must be atleast 20 Characters"],
    },
    lectures:[
        {
            title:{
                type:String,
                required:true,
            },
            description:{
                type:String,
                required:true,
            },
            video:{
                public_id:{
                    type:String,
                    required:true,
                },
                url:{
                    type:String,
                    required:true,
                }
            }, 
        }
    ],
    poster:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    views:{
        type:Number,
        default:0,
    },
    numOfVideos:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        required:[true,"Please Select the Category"],
    },
    createdBy:{
        type:String,
        required:[true,"Enter the course creator name"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },  
});


export const Course = mongoose.model("Course",Schema);