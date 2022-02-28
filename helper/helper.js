const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/upload");
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage });

const uploadImage = (fileName) => {

}

const moment = require('moment');
var converter = require('hex2dec');

const uniqueId = ()=>{
    let date = moment();
    let year = date.format('YYYY');
    let month = Number(date.format('MM'));
    let week = date.format('ww');
    let day = Number(date.format('DD'));
    let hour = Number(date.format('HH'));
    let min = date.format('mm');
    let second = date.format('ss');
    let mlSecond = date.milliseconds();
    let a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let c = 'CFWEJMNOPQ',
    d = 'ZXBSGIYAKF';
    let fy = year.slice(0, 2);
    let ly = year.slice(2, 4);
    mlSecond = mlSecond.toString();

    let uniqueCode =
    Number(ly) +
    19 +
    // d[+ly[0]] +
    fy +
    a[month] +
    // week +
    day +
    a[hour] +
    min+
    //converter.decToHex(min).toString().toUpperCase() +
    second +
    converter.decToHex(mlSecond).toUpperCase();

    return uniqueCode;
}

module.exports = {uploadImage, uniqueId};