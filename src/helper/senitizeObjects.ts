export const sanitizeObject = (dto: Record<string, any>) => {
    const newDto = { ...dto };
    Object.keys(newDto).forEach((key) => {
        if (newDto[key] === 'null') {
            newDto[key] = null;
        }
    });
    return newDto;
};
