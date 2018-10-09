const bcrypt = require('bcryptjs');
var {mongoose} = require('../config/inc');

var schema = mongoose.Schema;


var userSchema = new schema({
       username : {
           type:String,
           trim:true,
           required:true,
           unique:[true,"Duplicate Entry is not allowed"],
           lowercase: true,
           indexed:true,
      },
       password:{
           type : String,
           required: true,
           minlenght:8
       },
       createdAt:{
            type:Date,
            default:new Date()
       },
       updateAt:{
         type:Date,
         default:new Date()
       }
},{use:'strict'});


userSchema.pre('save',function(next){
       var user = this;
       if(user.isModified('password')){
         bcrypt.genSalt(10,(err,salt)=>{
               bcrypt.hash(user.password,salt,(err,hash)=>{
                 user.password = hash;
                  next();
               });
         });
       }else{
         next();
      }
});


userSchema.statics.loginUser = function(req,res){
  var user = this;
  return user.findOne({'username':req.username}).then((result)=>{
        return new Promise((resolve,reject)=>{
             bcrypt.compare(req.password,result.password,(err,res)=>{
               if(res){
                   resolve(result);
                 }else{
                   reject();
                  }
           });
         });
    });
}


userSchema.statics.updateProfile = function(username,password){
      var user = this;
      //console.log(res);
      user.findOneAndUpdate({'username':username},{$set:{'password':password}},{new:true},(err,doc)=>{
         if(err){
           console.log("Some thing is missing");
         }
         console.log(doc);
      });
}


var Auth=mongoose.model('tbl_use_auth',userSchema);
module.exports = {Auth};
