import Category from '../models/Category';
import mongoose from 'mongoose';
import { ICategory } from '../types/models';

class CategoryService {
    public async find(data: Record<string, unknown>): Promise<ICategory[]> {
        try {
            const categories: ICategory[] = await Category.find(data);
            return categories;
        } catch(error) {
            throw error;
        };
    };

    public async findOne(data: Record<string, unknown>): Promise<ICategory | null> {
        try {
            const category: ICategory | null = await Category.findOne(data);
            return category;
        } catch(error) {
            if(error.name === 'CastError') return null;

            throw error;
        };
    };

    public async findById(id: string): Promise<ICategory | null> {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return null;
        };

        const category: ICategory | null = await Category.findById(id);
        return category;
    };

    public async updateOne(searchData: Record<string, unknown>, updateData: Record<string, unknown>): Promise<void> {
        await Category.updateOne(searchData, updateData);
    };

    public async create(data: Record<string, unknown>): Promise<ICategory> {
        const category: ICategory = new Category(data);
        await category.save();

        return category;
    };

    public async deleteOne(searchData: Record<string, unknown>): Promise<void> {
        await Category.deleteOne(searchData);
    };
};

export default CategoryService;