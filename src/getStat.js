import isReadableFile from './isReadableFile.js';
import { promises as fsPromises } from 'fs';

export default function getState(filePath) {
    return isReadableFile(filePath)
        .then((r) => r ? fsPromises.stat(filePath) : r);
}