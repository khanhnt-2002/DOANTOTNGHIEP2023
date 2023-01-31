require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"admin test" <quanlynhahang07@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt bàn ăn",
        html: getBodyHTMLEmail(dataSend),
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.custommerName}!</h3>
        <p>Bạn nhận được email này vì đã đặt bàn tại nhà hàng Sky Restaurant<p>
        <p>Thông tin đặt bàn:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Đầu bếp: ${dataSend.chefName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ
        tục đặt bàn.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>
        
        <div> Xin chân thành cảm ơn</div>
        
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Xin chào ${dataSend.custommerName}!</h3>
        <p>Bạn nhận được email này vì đã đặt bàn tại nhà hàng Sky Restaurant<p>
        <p>Thông tin đặt bàn:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Đầu bếp: ${dataSend.chefName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ
        tục đặt bàn.
        </p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
        </div>
        
        <div> Xin chân thành cảm ơn</div>
        
        `
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
            <h3>Xin chào ${dataSend.custommerName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch đặt bàn online trên website của chúng tôi</p>
            <p>Thông tin hóa đơn được gửi trong file đính kèm.</p>

            <div> Xin chân thành cảm ơn!</div>
            `
    }
    if (dataSend.language === 'en') {
        result =
            `
            <h3>Dear${dataSend.custommerName}!</h3>
            <p>You received this email because you made an online reservation on our website</p>
            <p>Invoice information is sent in the attached file.</p>

            <div>Sincerely thank!</div>
            `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: '"ADMIN ⚡⚡⚡" <quanlynhahang07@gmail.com>',
                to: dataSend.email,
                subject: "Kết quả đặt bàn",
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    },
                ],
            });

            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,

}