const express = require("express")
const app = express()
const mongoose = require("mongoose")
const env = require("dotenv")
const AdminAPI = require("./routes/admin")
const TeacherAPI = require("./routes/Teacher")
const StudentAPI = require("./routes/Students")
const ClassesAPI = require("./routes/Classes")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
 

env.config()
const options =
{
    definition : {
        openapi : "3.0.0",
        info :
        {
            title : "Homejam class management",
            version : "1.0.0",
            description : "Class Management System"
        },
        servers : 
        [
            {
                url : "http://localhost:2000/api"
            }
        ],
    },
    apis : ["./routes/*.js"]

}
const specs = swaggerJsDoc(options)


app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))

app.use(express.json())
mongoose.connect("mongodb+srv://Homejam:Homejam123@cluster0.idprk.mongodb.net/ClassManagements?retryWrites=true&w=majority",
() => {
    console.log("DB is Conntected")
}, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
app.use("/api",AdminAPI)
app.use("/api",TeacherAPI)
app.use("/api",StudentAPI)
app.use("/api",ClassesAPI)




app.listen(process.env.PORT,() =>
{
    console.log("connected to server")
})