import {Router} from "express";
import {AgreementRecord} from "../records/agreement.record";
import {AgreementEntity, EmployeeEntity, NewAgreementEntity, SetEmployeeForAgreement} from "../types";
import {ValidationError} from "../utils/errors";
import {EmployeeRecord} from "../records/employee.record";


export const agreementRouter = Router();

agreementRouter
    .get('/search/:institutionCity?', async (req, res) => {
        const agreementsList = await AgreementRecord.listAll(req.params.institutionCity ?? ``);
        res.json(agreementsList)
    })
    .get('/add', async (req, res) => {
        const employeesList = await EmployeeRecord.getEmployees()
        res.json(employeesList)
    })
    .get('/:id', async (req, res) => {
        const agreement = await AgreementRecord.getOne(req.params.id);

        const employee1 = agreement.employeeId1 === '' ? null : await EmployeeRecord.getOneSelected(agreement.employeeId1)
        const employee2 = agreement.employeeId2 === '' ? null : await EmployeeRecord.getOneSelected(agreement.employeeId2)

        if (agreement.employeeId1 !== null && employee1.id !== null) {
            agreement.employeeId1 = employee1.firstName + ' ' + employee1.lastName;
        }
        if (agreement.employeeId2 !== null && employee2.id !== null) {
            agreement.employeeId2 = employee2.firstName + ' ' + employee2.lastName;
        }
        res.json(agreement);
    })
    .post('/', async (req, res) => {
        const newAgreement = new AgreementRecord(req.body as NewAgreementEntity);
        const {body}: {
            body: NewAgreementEntity;
        } = req

        const employee1 = body.employeeId1 === '' ? null : await EmployeeRecord.getOne(body.employeeId1);
        const employee2 = body.employeeId2 === '' ? null : await EmployeeRecord.getOne(body.employeeId2);

        newAgreement.employeeId1 = employee1?.id ?? null;
        newAgreement.employeeId2 = employee2?.id ?? null;
        await newAgreement.insert();
        res.json(newAgreement);
    })
    .patch('/:id', async (req, res) => {
        const {body}: {
            body: NewAgreementEntity;
        } = req
        const agreement= await AgreementRecord.getOne(req.params.id);

        if (agreement === null) {
            throw new ValidationError('Nie znaleziono zlecenia z podanym ID.');
        }

        agreement.institutionName = body.institutionName;
        agreement.institutionCity = body.institutionCity;
        agreement.institutionStreet = body.institutionStreet;
        agreement.institutionZipCode = body.institutionZipCode;
        agreement.personForContact = body.personForContact;
        agreement.personForContactMail = body.personForContactMail;
        agreement.personForContactPhone = body.personForContactPhone;
        agreement.responseDate = body.responseDate;
        agreement.offerSendingDate = body.offerSendingDate;
        agreement.agreementNo = body.agreementNo;
        agreement.agreementStartDate = body.agreementStartDate;
        agreement.agreementEndDate = body.agreementEndDate;
        agreement.reportId = body.reportId;
        agreement.reportDate = body.reportDate;
        agreement.invoiceAmount = body.invoiceAmount;
        agreement.invoiceDate = body.invoiceDate;
        agreement.notes = body.notes;

        const employee1 = body.employeeId1 === '' ? null : await EmployeeRecord.getOne(body.employeeId1);
        const employee2 = body.employeeId2 === '' ? null : await EmployeeRecord.getOne(body.employeeId2);

        agreement.employeeId1 = employee1?.id ?? null;
        agreement.employeeId2 = employee2?.id ?? null;

        await agreement.update();
        res.json(agreement)
        res.status(201)
    })
    .patch('/employee/:agreementId', async (req, res) => {
        const {body}: {
            body: SetEmployeeForAgreement;
        } = req

        const agreement = await AgreementRecord.getOne(req.params.agreementId);

        if (agreement === null) {
            throw new ValidationError('Nie znaleziono zlecenia z podanym ID.');
        }

        const employee = body.employeeId === '' ? null : await EmployeeRecord.getOne(body.employeeId);

        agreement.employeeId1 = employee?.id ?? null;
        await agreement.update();
        agreement.employeeId2 = employee?.id ?? null;
        await agreement.update();

        res.json(agreement);
    });