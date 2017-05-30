const user1 = require('./../db/schema/userInfo');
const task1 = require('./../db/schema/task');
const getData = require('./../controller/getUser');
const schemaGQ = require('./schema.js')

const resolveFunctions = {
 
  User: {
    tasks(user) {
     return  user
    },
  },
  Task: {
   users(obj, args, context, info) {
      return user1.find({id:args.id})
    },
  },

   Query: {
    tasks(obj, args, context, info) {
      console.log(args)
      return task1.find({userId:args.userId})
    },
    users(obj, args, context, info) {
      return user1.find({id:args.id})
    },
  },
   Mutation: {
    addTask(_, { id, name, date, isCompleted, priority, userId }) {
      console.log(id, name, date, isCompleted, priority, userId)
     var addData = new task1( {id:id,
      name:name,
      date: new Date(date),
      isCompleted: isCompleted,
      priority: priority,
      userId:userId
     })

   
       return addData.save().then(function(data){
       console.log(data)
     }, function(error){
       console.log(error)
     })
       }
     }
    }  


module.exports = resolveFunctions;