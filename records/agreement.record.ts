import {AgreementEntity, NewAgreementEntity, SimpleAgreementEntity} from "../types";
import {NotFoundError, ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from "uuid";
import {FieldPacket, RowDataPacket} from "mysql2";

type AgreementRecordResults = [AgreementEntity[], FieldPacket[]];

export class AgreementRecord implements AgreementEntity {

    public id: string;
    public institutionName: string;
    public institutionCity: string;
    public institutionStreet: string;
    public institutionZipCode: string;
    public personForContact: string;
    public personForContactMail: string;
    public personForContactPhone: string;
    public responseDate: string;
    public offerSendingDate: string;
    public agreementNo: string;
    public agreementStartDate: string;
    public agreementEndDate: string;
    public executionDate: string;
    public employeeId1: string;
    public employeeId2: string;
    public reportId: string;
    public reportDate: string;
    public invoiceAmount: number | null;
    public invoiceDate: string;
    public notes: string;
    public count: number

    constructor(obj: NewAgreementEntity) {
        if (!obj.institutionName || obj.institutionName.length < 3 || obj.institutionName.length > 100) {
            throw new ValidationError('Nazwa nie może być pusta i nie może być dłuższa niż 100 znaków')
        }
        if (!obj.institutionCity || obj.institutionCity.length > 50) {
            throw new ValidationError('Miasto nie może byc pusty i nie możebyć dłuższy nic 50 znaków.')
        }
        if (!obj.personForContact || obj.personForContact.length > 50) {
            throw new ValidationError('Imię i nazwisko osoby do kontaktu nie może byc puste i nie może byc dłuższe niz 50 znaków.')
        }
        if ((!obj.personForContactMail || obj.personForContactMail.length < 5 || obj.personForContactMail.length > 50) || !obj.personForContactMail.includes('@')) {
            throw new ValidationError('Adres e-mail nie może być krótszy niż 5 znaków i dłuższy niż 50 znaków. Poprawny adres e-mail musi zawierać @.')
        }
        if (!obj.personForContactPhone || String(obj.personForContactPhone).length !== 9) {
            throw new ValidationError('Numer telefonu musi mieć 9 znaków.')
        }

        this.id = obj.id;
        this.institutionName = obj.institutionName;
        this.institutionCity = obj.institutionCity;
        this.institutionStreet = obj.institutionStreet;
        this.institutionZipCode = obj.institutionZipCode;
        this.personForContact = obj.personForContact;
        this.personForContactMail = obj.personForContactMail;
        this.personForContactPhone = obj.personForContactPhone;
        this.responseDate = obj.responseDate;
        this.offerSendingDate = obj.offerSendingDate;
        this.agreementNo = obj.agreementNo;
        this.agreementStartDate = obj.agreementStartDate;
        this.agreementEndDate = obj.agreementEndDate;
        this.executionDate = obj.executionDate;
        this.employeeId1 = obj.employeeId1;
        this.employeeId2 = obj.employeeId2;
        this.reportId = obj.reportId;
        this.reportDate = obj.reportDate;
        this.invoiceAmount = obj.invoiceAmount;
        this.invoiceDate = obj.invoiceDate;
        this.notes = obj.notes;
        this.count = obj.count;
    }

    static async getOne(id: string): Promise<AgreementRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `agreements` WHERE id = :id", {
            id,
        }) as AgreementRecordResults;
        if (results.length === 0) {
            throw new NotFoundError('Nie można znaleźć elementu o danym ID.');
        } else {
            return new AgreementRecord(results[0])
        }
    }

    static async listAll(institutionCity: string): Promise<SimpleAgreementEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `agreements` WHERE `institutionCity` LIKE :search ORDER BY `institutionCity` ASC", {
            search: `%${institutionCity}%`,
        }) as AgreementRecordResults;
        return results.map(result => {
            const {
                id,
                institutionName,
                institutionCity,
                institutionStreet,
                agreementNo,
                agreementEndDate,
                executionDate,
                reportId,
                count,
            } = result;
            return {
                id,
                institutionName,
                institutionCity,
                institutionStreet,
                agreementNo,
                agreementEndDate,
                executionDate,
                reportId,
                count,
            }
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!')
        }
        await pool.execute("INSERT INTO `agreements` (`id`, `institutionName`, `institutionCity`, `institutionStreet`, `institutionZipCode`, `personForContact`, `personForContactMail`, `personForContactPhone`, `responseDate`, `offerSendingDate`, `agreementNo`, `agreementStartDate`, `agreementEndDate`, `employeeId1`, `employeeId2`, `executionDate`, `reportId`, `reportDate`, `invoiceAmount`, `invoiceDate`, `notes`) VALUES (:id, :institutionName, :institutionCity, :institutionStreet, :institutionZipCode, :personForContact, :personForContactMail, :personForContactPhone, :responseDate, :offerSendingDate, :agreementNo, :agreementStartDate, :agreementEndDate, :employeeId1, :employeeId2, :executionDate, :reportId, :reportDate, :invoiceAmount, :invoiceDate,:notes)", this)
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `agreements` SET `institutionName`= :institutionName, `institutionCity`= :institutionCity, `institutionStreet`= :institutionStreet, `institutionZipCode`= :institutionZipCode, `personForContact`= :personForContact, `personForContactMail`= :personForContactMail, `personForContactPhone`= :personForContactPhone, `responseDate`= :reportDate, `offerSendingDate`= :offerSendingDate, `agreementNo`= :agreementNo, `agreementStartDate`= :agreementStartDate, `agreementEndDate`= :agreementEndDate, `employeeId1`= :employeeId1, `employeeId2`= :employeeId2, `executionDate`= :executionDate, `reportId`= :reportId, `reportDate`= :reportDate, `invoiceAmount`= :invoiceAmount, `invoiceDate`= :invoiceDate WHERE `id` = :id", {
            id: this.id,
            institutionName: this.institutionName,
            institutionCity: this.institutionCity,
            institutionStreet: this.institutionStreet,
            institutionZipCode: this.institutionZipCode,
            personForContact: this.personForContact,
            personForContactMail: this.personForContactMail,
            personForContactPhone: this.personForContactPhone,
            responseDate: this.responseDate,
            offerSendingDate: this.offerSendingDate,
            agreementNo: this.agreementNo,
            agreementStartDate: this.agreementStartDate,
            agreementEndDate: this.agreementEndDate,
            employeeId1: this.employeeId1,
            employeeId2: this.employeeId2,
            executionDate: this.executionDate,
            reportId: this.reportId,
            reportDate: this.reportDate,
            invoiceAmount: this.invoiceAmount,
            invoiceDate: this.invoiceDate,
            notes: this.notes,
        });
    }

    async amountOfCompletedData(id: string): Promise<number> {
        const result = (await pool.execute("SELECT SUM (CASE WHEN `id` = '' OR `id` IS NULL THEN 1 ELSE 0 END + CASE WHEN `institutionName` = '' OR `institutionName` IS NULL THEN 1 ELSE 0 END + CASE WHEN`institutionCity` = '' OR `institutionCity` IS NULL THEN 1 ELSE 0 END + CASE WHEN`institutionStreet` = '' OR `institutionStreet` IS NULL THEN 1 ELSE 0 END + CASE WHEN`institutionZipCode` = '' OR `institutionZipCode` IS NULL THEN 1 ELSE 0 END + CASE WHEN`personForContact` = '' OR `personForContact` IS NULL THEN 1 ELSE 0 END + CASE WHEN`personForContactMail` = '' OR `personForContactMail` IS NULL THEN 1 ELSE 0 END + CASE WHEN`personForContactPhone` = '' OR `personForContactPhone` IS NULL THEN 1 ELSE 0 END + CASE WHEN`responseDate` = '' OR `responseDate` IS NULL THEN 1 ELSE 0 END + CASE WHEN`offerSendingDate` = '' OR `offerSendingDate` IS NULL THEN 1 ELSE 0 END + CASE WHEN`agreementNo` = '' OR `agreementNo` IS NULL THEN 1 ELSE 0 END + CASE WHEN`agreementStartDate` = '' OR `agreementStartDate` IS NULL THEN 1 ELSE 0 END + CASE WHEN`agreementEndDate` = '' OR `agreementEndDate` IS NULL THEN 1 ELSE 0 END + CASE WHEN`employeeId1` = '' OR `employeeId1` IS NULL THEN 1 ELSE 0 END + CASE WHEN`employeeId2` = '' OR `employeeId2` IS NULL THEN 1 ELSE 0 END + CASE WHEN`executionDate` = '' OR `executionDate` IS NULL THEN 1 ELSE 0 END + CASE WHEN`reportId` = '' OR `reportId` IS NULL THEN 1 ELSE 0 END + CASE WHEN`reportDate` = '' OR `reportDate` IS NULL THEN 1 ELSE 0 END + CASE WHEN`invoiceAmount` = '' OR `invoiceAmount` IS NULL THEN 1 ELSE 0 END + CASE WHEN`invoiceDate` = '' OR `invoiceDate` IS NULL THEN 1 ELSE 0 END) AS `count` FROM `agreements` WHERE id = :id", {
            id: this.id
        }));
        const rows = <RowDataPacket[]>result[0];
        const count = rows[0].count;
        return count
    }
}