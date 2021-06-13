const express = require("express")
const router = express.Router()
const {signup,signin,requireSignIn} = require("../controllers/Students")
const {validateSignupReq, isReqValidated, validateSignInReq}  =  require("../Vaildators/UserValidators")



router.post("/students/signup",requireSignIn,validateSignupReq,isReqValidated,signup)
router.post("/students/signin",validateSignInReq,isReqValidated,signin)




module.exports = router