export default (value: string, length: number): boolean => {
    return !(value.length < length);
};