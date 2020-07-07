export default (value: unknown, type: string): boolean => {
    return typeof value === type;
};