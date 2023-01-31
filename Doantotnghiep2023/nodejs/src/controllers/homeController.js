import { json } from 'body-parser';
import db from '../models/index'
import CRUDservice from "../services/CRUDservice"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e);
    }

}
let getCrud = (req, res) => {
    return res.render('crud.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message)

    return res.send('ffffffffff')
}
let displayGetCRUD = async (req, res) =>{
    let data = await CRUDservice.getAllUser();   

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;    
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        
        //let userData
       return res.render('editCRUD.ejs',{
         user: userData 
       });
    }      
    else {
        return res.send('Users not found');
    }    
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers        
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('Xoá người dùng thành công!')
    }
    else {
        return res.send('Người dùng không tìm thấy')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}  