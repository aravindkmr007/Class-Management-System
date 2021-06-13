const express = require("express")
const router = express.Router()
const {signup,signin,requireSignIn,Users} = require("../controllers/Admin")
const {validateSignupReq, isReqValidated, validateSignInReq}  =  require("../Vaildators/UserValidators")


router.post("/admin/signup",requireSignIn,validateSignupReq,isReqValidated,signup)
router.post("/admin/signin",validateSignInReq,isReqValidated,signin)

router.get("/admin/users",requireSignIn,Users)




module.exports = router