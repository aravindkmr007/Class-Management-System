const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        hash_Password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Student", "admin","Teacher"],
            default: "admin"
        },
        contact: {
            type: String,
            required: true
        },
        classes : [
            {type : mongoose.Schema.Types.ObjectId, ref: "Classes"}
        ]

    }, { timeStamps: true }
)
UserSchema.virtual("password")
.set(function(password){
    this.hash_Password = bcrypt.hashSync(password,5);

})
UserSchema.methods = {
    authenticate : function(password) 
    {
        return bcrypt.compareSync(password, this.hash_Password)

    }
    
}



module.exports = mongoose.model("Users", UserSchema)