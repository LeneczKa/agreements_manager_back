import {Router} from "express";
import {ValidationError} from "../utils/errors";
import {EmployeeRecord} from "../records/employee.record";
import {AgreementRecord} from "../records/agreement.record";

export const archiveRouter = Router();

archiveRouter
    .get('/search/:institutionCity?', async (req, res) => {
        const archiveAgreementsList = await AgreementRecord.listAllArchive(req.params.institutionCity ?? ``);
        res.json(archiveAgreementsList);
    })
    .get('/:id', async (req, res) => {
        const archiveAgreement = await AgreementRecord.getOneArchive(req.params.id);

        const employee1 = archiveAgreement.employeeId1 === '' ? null : await EmployeeRecord.getOneSelected(archiveAgreement.employeeId1)
        const employee2 = archiveAgreement.employeeId2 === '' ? null : await EmployeeRecord.getOneSelected(archiveAgreement.employeeId2)

        if (archiveAgreement.employeeId1 !== null && employee1.id !== null) {
            archiveAgreement.employeeId1 = employee1.firstName + ' ' + employee1.lastName;
        }
        if (archiveAgreement.employeeId2 !== null && employee2.id !== null) {
            archiveAgreement.employeeId2 = employee2.firstName + ' ' + employee2.lastName;
        }

        res.json(archiveAgreement);
    })