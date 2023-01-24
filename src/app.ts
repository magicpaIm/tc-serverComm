import express, { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import passport from "passport";
import { jwtStrategy } from "./config/passport";
import cors from "cors";
import httpStatus from "http-status";
import path from "path";
import { error } from "./middlewares";
import { ApiError } from "./utils";
import routes from "./routes/v1";

const app: Application = express();

// set security HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../', '/statics/index.html'));
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(error.errorConverter);
app.use(error.errorHandler);


import moment = require("moment-timezone");
const x = moment().tz("Asia/Tehran").format('Z')// -05:00
console.log(typeof x)


console.log(x)
const spl = x.split("[+]");
console.log(spl)


export default app;

