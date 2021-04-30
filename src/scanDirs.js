import { mux } from 'mux-async-iterator';
import { crawFile } from './getFileList.js';
import FileInfo from './FileInfo.js';
import findDupFiles from './findDupFiles.js';
import isReadableFile from './isReadableFile.js';

export async function getAllFileInfoList(...paths) {
    const allFileList = mux(...paths.map(p => crawFile(p)));

    let fileInfoList = [];
    for await(const fPath of allFileList) {
        if (await isReadableFile(fPath)) {
            fileInfoList.push(new FileInfo(fPath).getStat());
        }
        else {
            console.log(`${fPath} is not readable File`);
        }
    }
    fileInfoList = await Promise.all(fileInfoList);
    // console.log(fileInfoList);
    return fileInfoList;
}

export async function classifyInfoList(fileInfoList) {
    const classifySize = new Map();
    await Promise.all(fileInfoList.map(async fInfo => {
        const size = await fInfo.getSize();

        let fInfos = classifySize.get(size);
        if (fInfos === undefined) {
            classifySize.set(size, [fInfo]);
        }
        else {
            fInfos.push(fInfo);
            classifySize.set(size, fInfos);
        }
    }));
    // console.log(classifySize);
    return classifySize;
}

export async function getDupFileMapList(classifyIList) {
    let dupFilesList = [];

    for (const [size, fInfoList] of classifyIList) {
        if (fInfoList.length === 1) {
            continue;
        }
        
        const dupFiles = findDupFiles(fInfoList);
        dupFilesList.push(dupFiles);
    }
    dupFilesList = await Promise.all(dupFilesList);

    return dupFilesList;
}

export default async function scanDirs(...dirPaths) {
    dirPaths.forEach(p => console.log(`Scan: ${p}`));
    return getAllFileInfoList(...dirPaths)
        .then(allFileInfoList => {
            console.log(`Found: ${allFileInfoList.length} files`);
            return allFileInfoList;
        })
        .then(classifyInfoList)
        .then(getDupFileMapList)
        .then(dupFilesList => {
            let dupCount = 0;
            console.log('Duplicate File List');
            for(const m of dupFilesList) {
                for(const [k, s] of m) {
                    dupCount += s.size;
                    for(const fileInfo of s) {
                        console.log(` - ${fileInfo.getPath()}`);
                    }
                }
            }
            console.log(`Duplicate Found: ${dupCount} files`);
            return dupFilesList;
        })
        .catch(err => console.error(`scanDir() error ${dirPaths} ${err}`));
}