const jwt = require("jsonwebtoken")
const Classes = require("../models/Classes")
const Users = require("../models/User")

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authentization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    if(req.user.role === "Teacher")
    {
        next();
    }
    else
    {
        return res.status(400).json({nessage : "Only Teacher can Create or Delete the Classes"})
    }
}

exports.AddingStudent = (req,res) =>
{
    Classes.findOneAndUpdate({_id : req.body._id},{$push: {JoinedStudents : req.body.studentID}})
    .exec((error,data) =>
    {
        if(error)
        {
            return res.status(400).json({message : "Classes has been not there"})
        }
        if(data)
        {
            Users.findOneAndUpdate({_id : req.body._id}, {$push : {classes : data._id}})
            .exec((error,data)=>
            {
                if(error)
                {
                    console.log(error)
                }
                if(data)
                {
                    console.log(data)
                }
            })
            return res.status(200).json({message : "Student has been added to Lists" , data : data})
        }
    })
}

exports.AddingClasses = (req,res) =>
{
    const {title,subject,description, StudentsId} = req.body
    const newClasses = new Classes({
        title,
        subject,
        description,
        JoinedStudents : StudentsId, 
        createdBy : req.user._id
    })
    newClasses.save((error,data) =>
    {
        if(error)
        {
            return res.status(400).json({meassge : "Classes is not created",err : error})
        }
        if(data)
        {
            StudentsId.map((e) => 
                Users.findOneAndUpdate({_id : e}, {$push : {classes : data._id}})
                .exec((error,data) => 
                {
                    if(error)
                    {
                        console.log(error)
                    }
                    if(data)
                    {
                        console.log(data)
                    }
                })
            )
            return res.status(201).json({message : "Classes is created Successfully", data :data})
        }
    })
    
}


exports.GettingClasses =(req,res) => 
{
    Classes.find()
    .exec((error,data) => 
    {
        if(error)
        {
            return res.status(400).json({message : "There is No Classes",error :error})
        }
        if(data)
        {
            return res.status(201).json({message : "Classes Active" , data : data})
        }
    })
}


exports.DeletingClasses = (req,res) => 
{
    Classes.findOneAndDelete({_id : req.body._id})
    .exec((error,data) =>
    {
        if(error === null)
        {
            console.log(error)
            return res.status(400).json({message : "The Classes is not founded",error : error})
        }
        if(data)
        {
            return res.status(201).json({message:"The Classess is Deleted",data : data})
        }
    })
}


exports.UpdatingClasses = (req,res) =>
{
    Classes.findOneAndUpdate({_id : req.body._id},{title : req.body.title,subject : req.body.subject,description : req.body.description})
    .exec((error,data) =>
    {
        if(error)
        {
            return res.status(400).json({message : "Classes is not founded",error: error})
        }
        if(data)
        {
            return res.status(200).json({message : "Classes is updated",data: data})
        }
    })
}

exports.RemovingStudent = (req,res) =>
{
    Classes.updateOne({_id : req.body._id}, {$pull : {JoinedStudents  : req.body.StudentId}} )
    .exec((error,data) =>
    {
        if(error)
        {
            return res.status(400).json({message : "Studnet is not Founded"})
        }
        if(data)
        {
            Users.updateOne({_id :req.body.StudentId} , {$pull : {classes : data._id}})
            .exec((error,data) =>
            {
                if(error)
                {
                    console.log(error)
                }
                if(data)
                {
                    console.log(data)
                }
            })
            return res.status(200).json({message : "The Students is Removed from Classes"})
        }
    })
}