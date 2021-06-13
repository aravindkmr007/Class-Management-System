const mongoose = require("mongoose")


const ClassesSchmea = new mongoose.Schema({
    title : {
        type :String,
        required : true,
        trim : true,
        min :3,
        max : 20
    },
    subject : {
        type : String,
        required : true,
        trim : true,
        min : 4
    },
    description: { type: String, required: true, trim: true },
    JoinedStudents : [
        {type: mongoose.Schema.Types.ObjectId, ref: "Users"}
    ],
    createdBy :  {
        type: mongoose.Schema.Types.ObjectId, ref: "Users" ,
        required : true 
    }
},{timeStamps : true})

module.exports = mongoose.model("Classes",ClassesSchmea)