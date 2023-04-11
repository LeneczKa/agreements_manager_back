import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import rateLimit from "express-rate-limit";
import './utils/db'
import {handleError} from "./utils/errors";
import {employeeRouter} from "./routers/employee";
import {agreementRouter} from "./routers/agreement";
import {archiveRouter} from "./routers/archive";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(express.json());
app.use(rateLimit({
    windowMs: 5 * 60 * 100,
    max: 100,
}))

app.use('/employee', employeeRouter);
app.use('/agreement', agreementRouter);
app.use('/archive', archiveRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001')
});
