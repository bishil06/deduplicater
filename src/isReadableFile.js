import { promises as fsPromises, constants } from 'fs';

export default function isReadableFile(filePath) {
    return fsPromises.access(filePath, constants.R_OK)
        .then(() => true) // 접근가능
        .catch(err => {
            if (err.code === 'EACCES') return false; // 접근권한이 없음
            else console.error(`access() error ${filePath} ${err}`); // 다른 에러
    });
}