import CategoryService from "../../services/category-service";

const defaultServices = {
    category: new CategoryService
};

export default async (categoryId: string, services: typeof defaultServices = defaultServices): Promise<void> => {
    await services.category.deleteOne({ _id: categoryId });
};