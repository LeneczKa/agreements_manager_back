import {Router} from "express";
import {EmployeeRecord} from "../records/employee.record";
import {NewEmployeeEntity} from "../types";

export const employeeRouter = Router();

employeeRouter
    .get('/search/:lastName?', async (req, res) => {
        const employeesList = await EmployeeRecord.listAll(req.params.lastName ?? ``);
        res.json(employeesList)
    })
    .get('/:id', async (req, res) => {
        const employee = await EmployeeRecord.getOne(req.params.id);
        res.json(employee);
    })
    .post('/', async (req, res) => {
        const newEmployee = new EmployeeRecord(req.body as NewEmployeeEntity);
        await newEmployee.insert();
        res.json(newEmployee);
    })
    .patch('/:id', async (req, res) => {
        const employee = await EmployeeRecord.getOne(req.params.id);
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.email = req.body.email;
        employee.phone = req.body.phone;

        await employee.update();
        res.json(employee);
        res.status(201)
    })
    .put('/:id', async(req, res) => {
        const employee = await EmployeeRecord.getOne(req.params.id);
        await employee.archive();
        res.json(employee);
        res.status(201)
    })
    .get('/archive/search', async (req, res) => {
        const archiveEmployeesList = await EmployeeRecord.listArchive();
        res.json(archiveEmployeesList)
    })
