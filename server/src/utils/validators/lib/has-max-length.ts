export default (value: string, length: number): boolean => {
    if(value.length > length) return false;

    return true;
};