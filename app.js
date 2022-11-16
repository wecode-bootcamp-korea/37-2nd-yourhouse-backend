require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path")

const routes = require("./routes");
const { BaseError } = require("./util/error");
const { globalErrorHandler } = require("./middleware/errorHandler");


const createApp = () => {
    const app = express();
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "./front/build")))
    app.use(routes);
    app.use(function (err, req, res, next) {
        console.log('This is the invalid field ->', err.field)
        next(err)
      })
    
    app.get("", function(req,res,next){
        res.send(express.static(path.join(__dirname, "./front/build/index.html")))
    })
    app.all("*", (req, res, next) => {
        const err = new BaseError(`Can't fint ${req.originalUrl} on the Server`, 404);
        next(err);
    })

    app.use(globalErrorHandler);

    return app;
}

module.exports = { createApp }
