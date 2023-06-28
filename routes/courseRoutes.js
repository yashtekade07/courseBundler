import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeSubsribers, authorizeadmin, isAutheticated } from "../middlewares/auth.js";

const router=express.Router({});

router.route('/courses').get(getAllCourses); // Get All courses without lectures

router.route('/createcourse').post(isAutheticated,authorizeadmin,singleUpload,createCourse); // create new Course -- only admin

router.route('/course/:id')
        .get(isAutheticated,authorizeSubsribers,getCourseLectures) //To get Lecture of particuler course
        .post(isAutheticated,authorizeadmin,singleUpload,addLecture)    //  To Post Lecture of particular course
        .delete(isAutheticated,authorizeadmin,deleteCourse); // To Delete course

router.route('/lecture').delete(isAutheticated,authorizeadmin,deleteLecture);

export default router;