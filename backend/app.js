const express = require("express");
const app = express();
const errorHandler = require("./Middleware/error");
const cookieParser = require("cookie-parser") ;
app.use(express.json());
app.use(cookieParser());
// Route imports
const product = require("./Routes/ProductRoute");
const user = require("./Routes/UserRoute");
app.use("/api/v1",product);
app.use("/api/v1",user);
// middleware for error
app.use(errorHandler)
module.exports = app