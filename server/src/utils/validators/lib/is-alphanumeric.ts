export default (value: string): boolean => {
    const regex: RegExp = /^[a-zA-Z0-9]+$/;

    return regex.test(value);
};