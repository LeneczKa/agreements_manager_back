import {EmployeeEntity, NewEmployeeEntity} from "../types";
import {NotFoundError, ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type EmployeeRecordResults = [EmployeeEntity[], FieldPacket[]];

export class EmployeeRecord implements EmployeeEntity {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: string;

    constructor(obj: NewEmployeeEntity) {
        if (!obj.firstName || obj.firstName.length < 3 || obj.firstName.length > 20) {
            throw new ValidationError('Imię nie może byc puste i nie może być dłuższe nic 50 znaków')
        }
        if (!obj.lastName || obj.lastName.length < 2 || obj.lastName.length > 30) {
            throw new ValidationError('Nazwisko musi mieć węcej niż jeden znak i mniej nić 50.')
        }
        if ((!obj.email || obj.email.length < 5 || obj.email.length > 50) || !obj.email.includes('@')) {
            throw new ValidationError('Adres e-mail nie może być krótszy niż 5 znaków i dłuższy niż 50 znaków. Poprawny adres e-mail musi zawierać @.')
        }
        if (!obj.phone || String(obj.phone).length !== 9) {
            throw new ValidationError('Numer telefonu musi mieć 9 znaków.')
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
        if (results.length === 0) {
            throw new NotFoundError('Nie można znaleźć elementu o danym ID.');
        } else {
            return new EmployeeRecord(results[0]);
        }
    }

    static async listAll(lastName: string): Promise<EmployeeEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `employees` WHERE `lastName` LIKE :search ORDER BY `lastName` ASC", {
            search: `${lastName}%`,
        }) as EmployeeRecordResults;
        return results.map(obj => new EmployeeRecord(obj));
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!')
        }
        await pool.execute("INSERT INTO `employees` (`id`, `firstName`, `lastName`, `email`, `phone`) VALUES (:id, :firstName, :lastName, :email, :phone)", this)
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `employees` SET `firstName` = :firstName, `lastName` = :lastName, `email` = :email, `phone`= :phone WHERE `id` = :id", {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone
        });
    }
};