import { Document, ObjectId } from 'mongoose';

export interface IProduct extends Document {
    amountAvailable: number,
    cost: number,
    productName: string,
    sellerId: ObjectId
}