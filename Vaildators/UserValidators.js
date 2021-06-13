const { check ,validationResult} = require("express-validator");


exports.validateSignupReq = [
    check("firstname")
    .notEmpty()
    .withMessage("Firstname is required"),
    check("lastname")
    .notEmpty()
    .withMessage("Lastname is required"),
    check("email")
    .isEmail()
    .withMessage("Invaild Email"),
    check("password")
    .isLength({min : 6})
    .withMessage("Password must be at least 6 letters"),
]
exports.validateSignInReq = [
    check("email")
    .isEmail()
    .withMessage("Invaild Email"),
    check("password")
    .notEmpty()
    .withMessage("Password is required"),  
]


exports.validateClasses = [
    check("title")
    .notEmpty()
    .withMessage("Title is Required"),
    check("subject")
    .notEmpty()
    .withMessage("Subject is Required"),
    check("description")
    .notEmpty()
    .withMessage("Description is Required")
]
exports.isReqValidated = (req,res,next)  =>
{
    const errors =  validationResult(req);
    if(errors.array().length > 0)
    {
        return res.status(400).json({error : errors.array()[0].msg})
    }
    next()
}