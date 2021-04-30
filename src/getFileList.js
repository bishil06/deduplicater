import fsPromises from 'fs/promises';
import pathModule from 'path';

async function *crawFile(path) {
    const fileList =  await fsPromises.readdir(path, { withFileTypes: true }).catch(err => console.error(`readdir() error ${path} ${err}`));
    for(const dirent of fileList) {
        if (dirent.isDirectory()) {
            yield* crawFile(pathModule.join(path, dirent.name));
        }
        else {
            yield pathModule.join(path, dirent.name);
        }
    }
}

export default async function getFileList(path) {
    path = pathModule.resolve(path);
    let allFileList = [];
    for await(const filePath of crawFile(path)) {
        allFileList.push(filePath);
    }
    return allFileList;
}

// getFileList('./').then(console.log)