import {EmployeeEntity, NewEmployeeEntity} from "../types";

export class EmployeeRecord implements EmployeeEntity {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public phone: number;

    constructor (obj: NewEmployeeEntity) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.phone = obj.phone;
    }
};