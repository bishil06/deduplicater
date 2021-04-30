import isSameFile from './isSameFile.js';

export default async function findDupFiles(fInfoList) {
    const len = fInfoList.length;
    const dupFileMap = new Map();
    // const result = new Set();

    for(let i=0; i<len; i++) {
        for(let j=i+1; j<len; j++) {
            if (await isSameFile(fInfoList[i], fInfoList[j])) {
                const dupFileSet = dupFileMap.get(fInfoList[i].calcFinish);
                if (dupFileSet === undefined) {
                    dupFileMap.set(fInfoList[i].calcFinish, new Set([fInfoList[i], fInfoList[j]]));
                }
                else {
                    // dupFileList.push(fInfoList[i]);
                    dupFileSet.add(fInfoList[j]);
                    dupFileMap.set(fInfoList[i].calcFinish, dupFileSet);
                }
                // result.add(fInfoList[i]);
                // result.add(fInfoList[j]);
            }
        }
    }

    return dupFileMap;
}