const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")

const Employee = require("./model/Employee")

require("./db_connect")

const app = express()
const encoder = bodyParser.urlencoded()

app.set("view engine", "hbs")
app.use(express.static(path.join(__dirname, "views/public")))
hbs.registerPartials(path.join(__dirname, "views/partials"))


app.get("/", async (req, res) => {
     try {
          let data = await Employee.find().sort({ _id: -1 })
          res.render("index", { data: data, error: "" })
     } catch (error) {
          console.log(error)
          res.render("index", { data: [], error: "Internal Server Error" })
     }
})

app.get("/add", (req, res) => {
     res.render("add", { errorMessage: {}, data: {} })
})

app.post("/add", encoder, async (req, res) => {
     try {
          var data = new Employee(req.body)
          await data.save()
          res.redirect("/")
     } catch (error) {
          var errorMessage = {
               email: error.keyValue?.email ? "Email Address Must Be Unqiue" : error.errors?.email ? error.errors.email.message : "",
               phone: error.keyValue?.phone ? "Phone Address Must Be Unqiue" : error.errors?.phone ? error.errors.phone.message : "",
               name: error.errors?.name ? error.errors.name.message : "",
               designation: error.errors?.designation ? error.errors.designation.message : "",
               salary: error.errors?.salary ? error.errors.salary.message : ""
          }
          res.render("add", { errorMessage: errorMessage, data: data })
     }
})

app.get("/delete/:_id", async (req, res) => {
     try {
          await Employee.deleteOne({ _id: req.params._id })
          res.redirect("/")
     } catch (error) {
          console.log(error);
          res.redirect("/")
     }
})

app.get("/edit/:_id", async (req, res) => {
     try {
          var data = await Employee.findOne({ _id: req.params._id })
          res.render("edit", { data: data, errorMessage: {} })
     } catch (error) {
          console.log(error);
          res.redirect("/")
     }
})
app.post("/edit/:_id",encoder, async (req, res) => {
     try {
          var data = await Employee.findOne({ _id: req.params._id })
          data.name = req.body.name
          data.email = req.body.email
          data.phone = req.body.phone
          data.designation = req.body.designation
          data.salary = req.body.salary
          data.city = req.body.city
          data.state = req.body.state
          await data.save()
          res.redirect("/")
     } catch (error) {
          console.log(error);
          var errorMessage = {
               email: error.keyValue?.email ? "Email Address Must Be Unqiue" : error.errors?.email ? error.errors.email.message : "",
               phone: error.keyValue?.phone ? "Phone Address Must Be Unqiue" : error.errors?.phone ? error.errors.phone.message : "",
               name: error.errors?.name ? error.errors.name.message : "",
               designation: error.errors?.designation ? error.errors.designation.message : "",
               salary: error.errors?.salary ? error.errors.salary.message : ""
          }
          res.render("edit", { errorMessage: errorMessage, data: data })
     }
})

app.listen(8000, () => console.log("Server is Running at http://localhost:8000"))
