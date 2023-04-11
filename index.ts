import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {employeeRouter} from "./routers/employee";
import {agreementRouter} from "./routers/agreement";
import {archiveRouter} from "./routers/archive";
import {config} from "./config/config";
import './utils/db'

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(express.json());
app.use(rateLimit({
    windowMS: 5 * 60 * 1000,
    max: 100,
}))

app.use('/employee',employeeRouter);
app.use('/agreement',agreementRouter);
app.use('/archive', archiveRouter);
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001')
});
