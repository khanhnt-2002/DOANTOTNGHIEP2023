const db = require("../models");

let createRestaurant = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameder'
                })
            }
            else {
                await db.Restaurant.create({
                    name: data.name,
                    image: data.imageBase64,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    }
    )
}
let getAllRestaurant = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Restaurant.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errMessage: 'ok',
                errCode: 0,
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getDetailRestaurantById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Restaurant.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown'],
                })
                if (data) {
                    let chefRestautant = [];

                    chefRestautant = await db.Chef_Infor.findAll({
                        where: { restaurantId: inputId },
                        attributes: ['chefId', 'provinceId'],
                    })
                    data.chefRestautant = chefRestautant;

                } else data = {}
                resolve({
                    errMessage: 'ok',
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createRestaurant: createRestaurant,
    getAllRestaurant: getAllRestaurant,
    getDetailRestaurantById: getDetailRestaurantById,


}