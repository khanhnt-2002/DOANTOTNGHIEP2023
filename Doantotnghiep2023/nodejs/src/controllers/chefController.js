import chefService from "../services/chefService";

let getTopChefHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await chefService.getTopChefHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllChefs = async (req, res) => {
    try {
        let chefs = await chefService.getAllChefs()
        return res.status(200).json(chefs)
    } catch (e) {
        console.log(e)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'error from the server...'
        })
    }
}
let postInforChef = async (req, res) => {
    try {
        let response = await chefService.saveDetailInforChef(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({

            errCode: -1,
            errMessage: 'error from the server...'
        })
    }
}
let getDetailChefById = async (req, res) => {
    try {
        let infor = await chefService.getDetailChefById(req.query.id);
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

let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await chefService.bulkCreateSchedule(req.body);
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
let getScheduleByDate = async (req, res) => {
    try {
        let infor = await chefService.getScheduleByDate(req.query.chefId, req.query.date);
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
let getExtraInforChefById = async (req, res) => {
    try {
        let infor = await chefService.getExtraInforChefById(req.query.chefId);
        return res.status(200).json(
            infor
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Erorr from server...'
        })
    }
}
let getProfileChefById = async (req, res) => {
    try {
        let infor = await chefService.getProfileChefById(req.query.chefId);
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

let getListCustommerForChef = async (req, res) => {
    try {
        let infor = await chefService.getListCustommerForChef(req.query.chefId, req.query.date);
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

let sendRemedy = async (req, res) => {
    try {
        let infor = await chefService.sendRemedy(req.body);
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
    getTopChefHome: getTopChefHome,
    getAllChefs: getAllChefs,
    postInforChef: postInforChef,
    getDetailChefById: getDetailChefById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforChefById: getExtraInforChefById,
    getProfileChefById: getProfileChefById,
    getListCustommerForChef: getListCustommerForChef,
    sendRemedy: sendRemedy,
}