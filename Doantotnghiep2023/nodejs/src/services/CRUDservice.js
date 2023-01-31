import bcrypt from "bcryptjs";
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassWord(data.password);
            await db.user.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender == '1' ? true : false,
                phonenumber: data.phonenumber,
                roleId: data.roleId,
            })
            resole("thanh cong")
        } catch (e) {
            reject(e)
        }
    })


}
let hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }

    })
}
let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = db.user.findAll({
                raw: true,
            })
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = db.user.findOne({
                where: { id: userId },
                raw: true,
            })

            if(user){
                resolve(user)
            }
            else{
                resolve({})
            }
        }catch(e){
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) =>{
        try{
            let user = await db.user.findOne({
                where: { id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                let allUsers = await db.user.findAll();
                resolve(allUsers);
                
            }else{
                resolve();    
            }    

        }catch(e) {
            console.log(e);
        }
    })
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.user.findOne({
                where: { id: userId }
            })
            
            if (user) {
                await user.destroy();
            }

            resolve(); //return;
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}