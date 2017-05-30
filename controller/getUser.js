const db = require('./../db/dbconnect');
const user = require('./../db/schema/userInfo');
module.exports = {
  get:function(req, res){
    db.on('connected',()=> {console.log('MongoDB Connected')});
    user.find({},(err, data)=>{
      if (err) throw err;
      console.log('User fetched successfully!');
     res.status(200).send({data:data});
    })
  }
}