import mongoose, { Schema, model, Model } from 'mongoose';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    name: { type: String, required: true, unique: true }, 
    description: { type: String, required: true, },
    purchase_price: { type: Number, required: true, default: 0 },
    sale_price: { type: Number, required: true, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    isActive: {type: Boolean, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier'},
    
},{
    timestamps: true
});


productSchema.index({ name: 'text'});


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );


export default Product;