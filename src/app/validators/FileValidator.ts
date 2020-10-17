const createRule = (rule: Function, errorMessage: string) => 
    async (file: Express.Multer.File) => 
        await Promise.resolve(rule(file)) ? null : errorMessage;

const createValidator = (...rules: Function[]) => {
    return async (file: Express.Multer.File) => {
        for (const rule of rules) {
            const errorMessage = await rule(file);

            if (errorMessage) {
                const error = new Error(errorMessage);
                error.stack = undefined;

                return error;
            }
        }

        return null;
    }
}

const allowedExtensions = [ 'jpg', 'jpeg', 'png' ];

const haveAllowedExtension = (file: Express.Multer.File) => {
    const fileName = file.originalname;
    const fileExtension = fileName.split('.').pop();

    if (!fileExtension) return false;

    return allowedExtensions.includes(fileExtension);
}

export default createValidator(
    createRule(
        haveAllowedExtension,
        `File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}.`
    )
)
