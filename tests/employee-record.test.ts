import {EmployeeRecord} from "../records/employee.record";

const defaultObj = {
    firstName: 'Test',
    lastName: 'Testowy',
    email: 'test.tesrtowy@email.com',
    phone: 123456789,
}

test ('Can build EmployeeRecord', () => {
    const employee = new EmployeeRecord(
        defaultObj
    );
    expect(employee.firstName).toBe('Test');
    expect(employee.lastName).toBe('Testowy');
    expect(employee.email).toBe('test.tesrtowy@email.com');
    expect(employee.phone).toBe(123456789);
});