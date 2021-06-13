const express = require("express")
const router = express.Router()
const {signup,signin,requireSignIn} = require("../controllers/Teacher")
const {validateSignupReq, isReqValidated, validateSignInReq}  =  require("../Vaildators/UserValidators")



router.post("/teacher/signup",requireSignIn,validateSignupReq,isReqValidated,signup)
router.post("/teacher/signin",validateSignInReq,isReqValidated,signin)




module.exports = router