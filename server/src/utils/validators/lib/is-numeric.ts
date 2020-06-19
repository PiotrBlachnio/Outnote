export default (value: string): boolean => {
    const regex: RegExp = /^\d+$/;

    return regex.test(value);
};