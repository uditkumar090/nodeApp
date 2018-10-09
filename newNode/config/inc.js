const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myduniaapi',(err,done)=>{
    console.log('connected');
});
module.exports = {mongoose};
