const db = require('./../db/dbconnect');
const task = require('./../db/schema/task');

module.exports = {
  get:function(req, res){
      db.on('connected',()=> {console.log('MongoDB Connected')});
            task.find({},(err, data)=>{
             if (err) 
                throw err;
             console.log('Task fetched successfully!');
      res.status(200).send({data:data});
    })
  }
}