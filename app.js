require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const { BaseError } = require("./util/error");
const { globalErrorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

app.all("*", (req, res, next) => {
    const err = new BaseError(`Can't fint ${req.originalUrl} on the Server`, 404);
    next(err);
})

app.use(globalErrorHandler);


app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));