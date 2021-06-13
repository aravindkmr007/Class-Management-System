const User = require("../models/User")
const jwt = require("jsonwebtoken")


exports.signup = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({ message: "Already Email is registered", data: user })
            }
            const { firstname, lastname, email, password, contact,role} = req.body
            const newUser = new User({
                firstname,
                lastname,
                email,
                password,
                username: Math.random().toString(),
                contact,
                role
            })
            newUser.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        meassage: "there is something wrong",
                        error: err
                    })
                }
                if (data) {
                    return res.status(201).json({
                        user: "User is Created SuccessFully",
                        data: data
                    })
                }
            })
        })
}


exports.signin = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({ error: err })
            if (user) {
                if (user.authenticate(req.body.password)&& user.role === "admin") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "4h" })
                    const { _id, firstname, lastname, contact, email, role, fullname } = user
                    res.status(200).json(
                        {
                            token,
                            user: {
                                firstname, lastname, contact, email, role, fullname, _id
                            }
                        }
                    )
                } else {
                    return res.status(400).json({
                        message: "Invaild Password"
                    })
                }
            }
            else {
                return res.status(400).json({ message: "User is not Registered" })
            }
        })
}

exports.requireSignIn = (req, res, next) => {
    const token = req.headers.authentization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next();
}

exports.Users = async (req, res) => {
    await User.find({})
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({message : "No Users is there", err : err})
            }
            if(data)
            {
                return res.status(201).json({message:"List of Users" , data : data})
            }
        } )
}