const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userInfoSchema = new Schema({
    id:{type:Number, required:true},
    name:{type:String, required: true },
    DOB:{type:Date, required: true },
    mobile:{type:String, required: true},
    gender:{type:String, required: true}
})
const userInfoModel = mongoose.model('User',userInfoSchema)

module.exports = userInfoModel;