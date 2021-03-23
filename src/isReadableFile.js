import { promises as fsPromises, constants } from 'fs';

export default function isReadableFile(filePath) {
    return fsPromises.access(filePath, constants.R_OK)
        .then(() => true)
        .catch(err => {
            if (err.code === 'EACCES') return false;
            else console.log(err);
    });
}