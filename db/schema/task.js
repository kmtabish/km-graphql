const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    id:{type:Number, required:true},
    name:{type:String, required: true },
    date:{type:Date, required: true },
    isCompleted:{type:Boolean},
    priority:{type:Number, required: true},
    userId:{type:Number, required:true}
})
const taskModel = mongoose.model('Task',taskSchema)

module.exports = taskModel;