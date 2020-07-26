import CategoryService from "../../services/category-service";

const defaultServices = {
    category: new CategoryService
};

async function deleteCategorySuccessHandler(id: string, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.category.deleteOne({ _id: id });
};

async function updateCategorySuccessHandler(id: string, updatedData: Record<string, unknown>, services: typeof defaultServices = defaultServices): Promise<void> {
    await services.category.updateOne({ _id: id }, updatedData);
};

export default {
    deleteCategorySuccessHandler,
    updateCategorySuccessHandler
};