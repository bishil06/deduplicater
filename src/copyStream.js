import fs from 'fs';

export default function copyStream(srcPath, destPath) {
    const rStream = fs.createReadStream(srcPath);
    rStream.on('error', (err) => {
        console.error(`readStream error ${srcPath} ${err}`);
    })
    const wStream = fs.createWriteStream(destPath);
    wStream.on('error', (err) => {
        console.error(`writeStream error ${destPath} ${err}`);
    })
    return rStream.pipe(wStream);
}