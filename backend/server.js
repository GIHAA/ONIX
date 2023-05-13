const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db');

const port = process.env.port || 8080

connectDB()

const app = express()

app.use(express.static("public"));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/feedback', require('./routes/feedBackRoutes'))
app.use('/api/suppliers', require('./routes/suppliersRoutes'))
app.use('/api/deliveries', require('./routes/deliveriesRoutes'))
app.use('/api/order', require('./routes/orderRoutes'))
app.use('/api/expenses', require('./routes/expensesRoutes'))
app.use('/api/stock', require('./routes/stockRoutes'))
app.use('/api/attendance', require('./routes/attendanceRoutes'))



const categoryRouter = require("./routes/category.js");  // import category.js file

 //http://Localhost:8070/category    [calling from the frontend to the backend is like this]

app.use("/category",categoryRouter)  //the file assigned to the student variable is loaded

//import category repport file
const categoryReport = require("./routes/CategoryReportFile.js");
app.use("/categoryReport",categoryReport)

//issued items
const issueItemRouter = require("./routes/inventry_issueItems.js"); 
app.use("/inventry_issueItems",issueItemRouter)

//import issue item report file
const itemReport = require("./routes/issueItemReportRouteFile");
app.use("/issueItemReport",itemReport)


app.listen(port, () => console.log(`Server started on port ${port}`));