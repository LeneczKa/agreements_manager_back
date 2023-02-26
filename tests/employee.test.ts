import {pool} from "../utils/db";
import {EmployeeRecord} from "../records/employee.record";

const defaultObj = {
    firstName: 'Test',
    lastName: 'Testowy',
    email: 'test.tesrtowy@email.com',
    phone: 123456789,
}

const defaultObj2 = {
    firstName: 'Tester',
    lastName: 'Testujacy',
    email: 'tester.testujacy@email.com',
    phone: 111111111,
}

afterAll(async () => {
    await pool.end();
});

test('EmployeeRecord.getOne returns data from database for one entry', async () => {
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

test('EmployeeRecord.listAll returns array of found entries.', async () => {
    const employees = await EmployeeRecord.listAll();

    expect(employees).not.toEqual([]);
    expect(employees[0].id).toBeDefined();
});

test('EmployeeRecord.insert returns new UUID.', async () => {
    const employee = new EmployeeRecord(defaultObj);
    await employee.insert();

    expect(employee.id).toBeDefined();
    expect(typeof employee.id).toBe('string');
});
