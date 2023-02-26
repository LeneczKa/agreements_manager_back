import {EmployeeEntity, NewEmployeeEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type EmployeeRecordResults = [EmployeeEntity[], FieldPacket[]];

export class EmployeeRecord implements EmployeeEntity {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: number;

    constructor(obj: NewEmployeeEntity) {
        if(!obj.firstName.length || obj.firstName.length > 50) {
            throw new ValidationError('Imię nie może byc puste i nie może być dłuższe nic 50 znaków')
        }
        if(obj.lastName.length < 2 || obj.lastName.length > 50) {
            throw new ValidationError('Nazwisko musi mieć węcej niż jeden znak i mniej nić 50.')
        }
        if((obj.email.length < 5 || obj.email.length > 50) || !obj.email.includes('@')) {
            throw new ValidationError('Adres e-mail nie może być krótszy nic 5 znaków i dłuższy niż 50 znaków. Poprawny adres e-mail musi zawierać @.')
        }
        if(typeof obj.phone !== 'number' || String(obj.phone).length !== 9) {
            throw new ValidationError('Numer telefonu musi być liczbą i musi zawierać 9 znaków.')
        }

        this.id = obj.id;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.phone = obj.phone;
    }

    static async getOne(id: string): Promise<EmployeeRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `employees` WHERE id = :id", {
            id,
        }) as EmployeeRecordResults;
        return results.length === 0 ? null : new EmployeeRecord(results[0]);
    }

    async insert(): Promise<void> {

    }
};