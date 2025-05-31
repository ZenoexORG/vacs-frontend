import { Employee } from "./employees";

export interface User extends Omit<Employee, 'username' | 'password'> { }
