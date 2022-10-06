const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { BaseError } = require("./util/error");
const { globalErrorHandler } = require("./middleware/errorHandler");


const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(routes);

    app.all("*", (req, res, next) => {
        const err = new BaseError(`Can't fint ${req.originalUrl} on the Server`, 404);
        next(err);
    })

    app.use(globalErrorHandler);

    return app
}


module.exports = { createApp }