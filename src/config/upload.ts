import { diskStorage } from 'multer';
import path from 'path';

import FileValidator from './../app/validators/FileValidator';

export default {
    storage: diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: async (request, file, callback) => {
            const error = await FileValidator(file);
            const fileName = !error ? `${Date.now()}-${file.originalname}` : '';

            callback(error, fileName);
        }
    })
}
