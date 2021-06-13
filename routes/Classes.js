
const {requireSignIn, AddingStudent,AddingClasses,GettingClasses,DeletingClasses,UpdatingClasses,RemovingStudent} = require("../controllers/Classes")
const express = require("express")
const { validateClasses, isReqValidated } = require("../Vaildators/UserValidators")
const router =  express.Router()


router.post("/AddClasses",requireSignIn,validateClasses,isReqValidated,AddingClasses)

router.get("/getClasses",requireSignIn,GettingClasses)
router.post("/deleteClasses",requireSignIn,DeletingClasses)

router.post("/updateClasses",requireSignIn,validateClasses,isReqValidated,UpdatingClasses)
router.post("/addingStudent",requireSignIn,AddingStudent)

router.post("/removeStudent",requireSignIn,RemovingStudent)
module.exports = router