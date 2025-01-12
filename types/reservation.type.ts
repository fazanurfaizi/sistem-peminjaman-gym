import type { ObjectId } from "mongoose";
import type { User } from "./user.type";

export interface Reservation {
    _id: ObjectId;
    user: User;
    date: string;
    room: string;
    telephone: string;
    startTime: string;
    endTime: string;
}