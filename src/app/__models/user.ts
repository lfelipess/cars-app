import { Car } from "./car";

export class User {
    uuid?: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    birthday!: Date;
    login!: string;
    password!: string;
    phone!: string;
    cars?: [Car];
}