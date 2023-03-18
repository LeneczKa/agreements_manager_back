export interface NewEmployeeEntity extends Omit<EmployeeEntity, 'id'> {
    id?: string,
}
export interface EmployeeEntity {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}