import express from "express";
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removerFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from "../controllers/userController.js";
import { authorizeadmin, isAutheticated } from "../middlewares/auth.js";
import singleUpload  from "../middlewares/multer.js"
const router=express.Router({});

router.route('/register').post(singleUpload,register); // To Register User
router.route('/login').post(login); // To login User
router.route('/logout').get(logout); // To logout User
router.route('/me').get(isAutheticated,getMyProfile); // To Get my Profile
router.route('/me').delete(isAutheticated,deleteMyProfile); // To Delete my Profile
router.route('/changepassword').put(isAutheticated,changePassword); // To changePassword
router.route('/updateprofile').put(isAutheticated,updateProfile); // To update profile
router.route('/updateprofilepicture').put(isAutheticated,singleUpload,updateProfilePicture); // To update profile
router.route('/forgetpassword').post(forgetPassword); //  forget password
router.route('/resetpassword/:token').put(resetPassword); // To Reset password
router.route('/addtoplaylist').post(isAutheticated,addToPlaylist); // To add to playlist
router.route('/removefromplaylist').delete(isAutheticated,removerFromPlaylist); // To remove from playlist

//Admin Routes
router.route('/admin/users').get(isAutheticated,authorizeadmin,getAllUsers);
router.route('/admin/users/:id').put(isAutheticated,authorizeadmin,updateUserRole)
                                .delete(isAutheticated,authorizeadmin,deleteUser);

export default router;