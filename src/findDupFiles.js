import isSameFile from './isSameFile.js';

export default async function findDupFiles(fInfoList) {
    const len = fInfoList.length;
    const result = new Set();

    for(let i=0; i<len; i++) {
        for(let j=i+1; j<len; j++) {
            if (await isSameFile(fInfoList[i], fInfoList[j])) {
                result.add(fInfoList[i]);
                result.add(fInfoList[j]);
            }
        }
    }

    return result;
}