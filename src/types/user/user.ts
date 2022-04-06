import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    deposit: number;
    role: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}