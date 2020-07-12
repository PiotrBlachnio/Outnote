export default (field: string): boolean => {
    const forbiddenFields: string[] = [
        'role',
        'password',
        'trustedIPS',
        'joinedAt',
        'isConfirmed',
        'ownerId',
        'createdAt',
        'lastEditedAt'
    ];

    return !forbiddenFields.includes(field);
};