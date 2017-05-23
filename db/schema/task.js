const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    name:{type:String, required: true },
    date:{type:Date, required: true },
    isCompleted:{type:Boolean}
})
const taskModel = mongoose.model('Task',taskSchema)

module.exports = taskModel;