import {pool} from "../utils/db";
import {EmployeeRecord} from "../records/employee.record";


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