import { promises as fsPromises, constants } from 'fs';

export default function isReadableFile(filePath) {
    const result = fsPromises.access(filePath, constants.F_OK | constants.R_OK)
        .catch(err => {
            if (err.code === 'EACCES') return false; // 접근권한이 없음
            else console.error(`access() error ${filePath} ${err}`); // 다른 에러
            return false;
        })
        .then((r) => (r === undefined) ? true : false) // 접근가능
        
    return result;
}