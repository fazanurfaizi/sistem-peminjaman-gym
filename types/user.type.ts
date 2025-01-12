import type { ObjectId } from "mongoose";

export interface User {
    _id: ObjectId;
    name: string;
    npm: string;
    email: string;
    password: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;