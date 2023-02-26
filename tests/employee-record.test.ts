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

test('Validates invalid email', ()=> {
    expect(() => new EmployeeRecord({
        ...defaultObj,
        email: 'ab.cddd',
    })).toThrow('Adres e-mail nie może być krótszy nic 5 znaków i dłuższy niż 50 znaków. Poprawny adres e-mail musi zawierać @.')
});

test('Validates invalid phone', ()=> {
    expect(()=> new EmployeeRecord({
        ...defaultObj,
        phone: 12234,
    })).toThrow('Numer telefonu musi być liczbą i musi zawierać 9 znaków.')
});