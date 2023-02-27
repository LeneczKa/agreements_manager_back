import {Router} from "express";
import {EmployeeRecord} from "../records/employee.record";
import {NewEmployeeEntity} from "../types";


export const employeeRouter = Router();

employeeRouter
    .get('/', async (req, res) => {
        const employeesList = await EmployeeRecord.listAll();
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
    .put('/update/:id', async (req, res) => {
        const employee = await EmployeeRecord.getOne(req.params.id);
        const employeeEdited = {
            ...employee,
            ...req.body
        };

        await employeeEdited.update();
        res.json(employeeEdited);
    })
