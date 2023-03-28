import {Router} from "express";
import {AgreementRecord} from "../records/agreement.record";
import {NewAgreementEntity, SetEmployeeForAgreement} from "../types";
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
        console.log(agreement)
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
    .put('/:id', async (req, res) => {
        const agreement = await AgreementRecord.getOne(req.params.id);
        agreement.institutionName = req.body.institutionName;
        agreement.institutionCity = req.body.institutionCity;
        agreement.institutionStreet = req.body.institutionStreet;
        agreement.institutionZipCode = req.body.institutionZipCode;
        agreement.personForContact = req.body.personForContact;
        agreement.personForContactMail = req.body.personForContactMail;
        agreement.personForContactPhone = req.body.personForContactPhone;
        agreement.responseDate = req.body.responseDate;
        agreement.offerSendingDate = req.body.offerSendingDate;
        agreement.agreementNo = req.body.agreementNo;
        agreement.agreementStartDate = req.body.agreementStartDate;
        agreement.agreementEndDate = req.body.agreementEndDate;
        agreement.employeeId1 = req.body.employeeId1;
        agreement.employeeId2 = req.body.employeeId2;
        agreement.reportId = req.body.reportId;
        agreement.reportDate = req.body.reportDate;
        agreement.invoiceAmount = req.body.invoiceAmount;
        agreement.invoiceDate = req.body.invoiceDate;
        agreement.notes = req.body.notes;

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