import { Schema, model } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

import { IProduct } from '../types';

const productSchema: Schema = new Schema<IProduct>({
    amountAvailable: { type: Number, required: true, default: 0 },
    cost: { type: Number, required: true },
    productName: { type: String, required: true, index: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User' },  // references 'User' model with Role 'seller'
})

productSchema.plugin(mongooseLeanVirtuals);

/**
 * @typedef Product
 */
export default model<IProduct>('Product', productSchema);
