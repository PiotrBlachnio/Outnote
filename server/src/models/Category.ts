import { Schema, model, Model } from 'mongoose';
import { ICategory } from '../types/models';

const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true
    }
});

const Category: Model<ICategory> = model('Category', CategorySchema);

export default Category;