import restaurantService from '../services/restaurantService'

let createRestaurant = async (req, res) => {
    try {
        let infor = await restaurantService.createRestaurant(req.body);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let getAllRestaurant = async (req, res) => {
    try {
        let infor = await restaurantService.getAllRestaurant();
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailRestaurantById = async (req, res) => {
    try {
        let infor = await restaurantService.getDetailRestaurantById(req.query.id);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    createRestaurant: createRestaurant,
    getAllRestaurant: getAllRestaurant,
    getDetailRestaurantById: getDetailRestaurantById,
}