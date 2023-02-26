import {pool} from "../utils/db";
import {EmployeeRecord} from "../records/employee.record";
import {EmployeeEntity} from "../types";

const defaultObj = {
    firstName: 'Test',
    lastName: 'Testowy',
    email: 'test.tesrtowy@email.com',
    phone: 123456789,
}

afterAll(async()=> {
    await pool.end();
});

test('EmployeeRecord.getOne returns data from database for one entry', async()=>{
    const employee = await EmployeeRecord.getOne('abc');

    expect(employee).toBeDefined();
    expect(employee.id).toBe('abc');
    expect(employee.firstName).toBe('Test');
    expect(employee.lastName).toBe('Testa');
    expect(employee.email).toBe('test.testa@email.com');
    expect(employee.phone).toBe(456789123);
});
test('EmployeeRecord.getOne returns null from database for unexisting entry.', async () => {
    const employee = await EmployeeRecord.getOne('---');

    expect(employee).toBeNull();
});

test('EmployeeRecord.findAll returns array of found entries.', async () => {
    const employees = await EmployeeRecord.findAll('');

    expect(employees).not.toEqual([]);
    expect(employees[0].id).toBeDefined();
});

test('EmployeeRecord.findAll returns empty array of found entries when searching for something that does not exist.', async () => {
    const employees = await EmployeeRecord.findAll('--------------------');

    expect(employees).toEqual([])
});
