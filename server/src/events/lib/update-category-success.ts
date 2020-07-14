import CategoryService from "../../services/category-service";

const defaultServices = {
    category: new CategoryService
};

export default async (categoryId: string, updatedData: Record<string, unknown>, services: typeof defaultServices = defaultServices): Promise<void> => {
    await services.category.updateOne({ _id: categoryId }, updatedData);
};