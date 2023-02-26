import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'agreements_manager',
    namedPlaceholders: true,
    decimalNumbers: true,
});