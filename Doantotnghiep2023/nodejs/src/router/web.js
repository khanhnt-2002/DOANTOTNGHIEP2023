import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import chefController from "../controllers/chefController";
import custommerController from '../controllers/custommerController';
import specialtyController from '../controllers/specialtyController';
import restaurantController from '../controllers/restaurantController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/home', (req, res) => {
        return res.send('hello word')
    });
    router.get('/crud', homeController.getCrud);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);


    router.get('/api/top-chef-home', chefController.getTopChefHome);
    router.get('/api/get-all-chef', chefController.getAllChefs);
    router.post('/api/save-infor-chef', chefController.postInforChef);
    router.get('/api/get-detail-chef-by-id', chefController.getDetailChefById);
    router.post('/api/bulk-create-schedule', chefController.bulkCreateSchedule);
    router.get('/api/get-schedule-chef-by-date', chefController.getScheduleByDate);
    router.get('/api/get-extra-infor-chef-by-id', chefController.getExtraInforChefById);
    router.get('/api/get-profile-chef-by-id', chefController.getProfileChefById);

    router.get('/api/get-list-custommer-for-chef', chefController.getListCustommerForChef);
    router.post('/api/send-remedy', chefController.sendRemedy);

    router.post('/api/custommer-book-appointment', custommerController.postBookAppointment);
    router.post('/api/verify-book-appointment', custommerController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    router.post('/api/create-new-restaurant', restaurantController.createRestaurant);
    router.get('/api/get-restaurant', restaurantController.getAllRestaurant);
    router.get('/api/get-detail-restaurant-by-id', restaurantController.getDetailRestaurantById);

    return app.use("/", router);
}
module.exports = initWebRoutes;