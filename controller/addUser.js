const db = require('./../db/dbconnect');
const user = require('./../db/schema/userInfo');
module.exports = {
  post:function(req, res){
    console.log(req.body)
    db.on('connected',()=> {console.log('MongoDB Connected')});
    var addUser = new user({
      id:req.body.id,
      name:req.body.name,
      DOB: new Date(req.body.DOB),
      mobile: req.body.mobile,
      gender: req.body.gender  
    })

    addUser.save(function(err){
      if (err) throw err;
      console.log('User saved successfully!');
     res.status(200).send({status:"success"});
    })
  }
}