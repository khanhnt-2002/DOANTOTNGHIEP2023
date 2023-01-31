import db from "../models/index";
require('dotenv').config();
import _, { reject } from 'lodash';
import emailService from '../services/emailService'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopChefHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.user.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}
let getAllChefs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let chefs = await db.user.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                }
            })
            resolve({
                errCode: 0,
                data: chefs
            })
        } catch (e) {
            reject(e)
        }
    })
}
let saveDetailInforChef = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequỉedFields(inputData);
            if (checkObj.isValid === false) {



                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter: ${checkObj.element}`
                })

            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        chefId: inputData.chefId
                    })
                } else if (inputData.action === 'EDIT') {
                    let chefMarkdown = await db.Markdown.findOne({
                        where: { chefId: inputData.chefId },
                        raw: false
                    })
                    if (chefMarkdown) {
                        chefMarkdown.contentHTML = inputData.contentHTML;
                        chefMarkdown.contentMarkdown = inputData.contentMarkdown;
                        chefMarkdown.description = inputData.description;
                        chefMarkdown.updateAt = new Date();
                        await chefMarkdown.save()
                    }
                }
                // upsert to chef-infor table
                let chefInfor = await db.Chef_Infor.findOne({
                    where: {
                        chefId: inputData.chefId,
                    },
                    raw: false
                })
                if (chefInfor) {
                    chefInfor.chefId = inputData.chefId;
                    chefInfor.priceId = inputData.selectedPrice;
                    chefInfor.provinceId = inputData.selectedProvince;
                    chefInfor.paymentId = inputData.selectedPayment;

                    chefInfor.addressRestaurant = inputData.addressRestaurant;
                    chefInfor.note = inputData.note;
                    chefInfor.specialtyId = inputData.specialtyId;
                    chefInfor.restaurantId = inputData.restaurantId;
                    await chefInfor.save()
                } else {
                    // creat
                    await db.Chef_Infor.create({
                        chefId: inputData.chefId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectProvince,
                        paymentId: inputData.selectedPayment,
                        nameRestaurant: inputData.nameRestaurant,
                        addressRestaurant: inputData.addressRestaurant,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        restaurantId: inputData.restaurantId,

                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'save infor CHEF SUCCEED'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getDetailChefById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: ' Missing required parameter!'
                })
            } else {
                let data = await db.user.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Chef_Infor,
                            attributes: {
                                exclude: ['id', 'chefId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('admin data send:', data)
            if (!data.arrSchedule || !data.chefId || !data.formattedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required param !'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                let existing = await db.Schedule.findAll(
                    {
                        where: { chefId: data.chefId, date: data.formattedDate },
                        attributes: ['timeType', 'date', 'chefId', 'maxNumber'],
                        raw: true
                    }
                );

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === +b.date;
                });

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate);
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getScheduleByDate = (chefId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!chefId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        chefId: chefId,
                        date: date
                    },
                    include: [
                        {
                            model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'],

                        },
                        { model: db.user, as: 'chefData', attributes: ['firstName', 'lastName'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = [];

                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getExtraInforChefById = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing req parameter'
                })
            } else {
                let data = await db.Chef_Infor.findOne({
                    where: {
                        chefId: idInput
                    },
                    attributes: {
                        exclude: ['id', 'chefId']
                    },
                    include: [

                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },


                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getProfileChefById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.user.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Chef_Infor,
                            attributes: {
                                exclude: ['id', 'chefId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getListCustommerForChef = (chefId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!chefId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        chefId: chefId,
                        date: date
                    },
                    include: [
                        {
                            model: db.user, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']
                        }
                    ],
                    raw: false,
                    nest: true

                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.chefId || !data.patientId || !data.timeType ||
                !data.imgBase64) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        chefId: data.chefId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S3';
                    await appointment.save()
                }
                await emailService.sendAttachment(data);

                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })

            }
        } catch (e) {
            reject(e);
        }

    })
}
let checkRequỉedFields = (inputData) => {
    let arrFields = ['chefId', 'contentHTML', 'contentMarkdown', 'action', 'selectedPrice', 'selectedPayment', 'selectedProvince', 'nameRestaurant',
        'addressRestaurant', 'note', 'specialtyId'
    ]

    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i]
            break;
        }
    }

    return {
        isValid: isValid,
        element: element
    }
}
module.exports = {
    getTopChefHome: getTopChefHome,
    getAllChefs: getAllChefs,
    saveDetailInforChef: saveDetailInforChef,
    getDetailChefById: getDetailChefById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforChefById: getExtraInforChefById,
    getProfileChefById: getProfileChefById,
    getListCustommerForChef: getListCustommerForChef,
    sendRemedy: sendRemedy,
}