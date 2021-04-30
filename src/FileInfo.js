import fsPromises from 'fs/promises';
import fs from 'fs';
import crypto from 'crypto';

export default class FileInfo {
    constructor(path, kb=1024) {
        this.path = path;
        this.stats = null;
        this.byte = kb*Math.pow(2,10); // 1048576
        this.hashList = []; // 1024*2^0, 1024*2^1, 1024*2^2, 1024*2^3, ...
        this.calcFinish = false;
    }

    getPath() {
        return this.path;
    }

    async getStat() {
        if (this.stats === null) {
            this.stats = await fsPromises.stat(this.path)
                .catch(err => console.error(`stats() error ${this.path} ${err}`));
        }
        
        return this;
    }

    async getIno() {
        if (this.stats === null) {
            await this.getStat();
        }
        return this.stats.ino;
    }

    async getSize() {
        if (this.stats === null) {
            await this.getStat();
        }
        return this.stats.size;
    }

    async calcNextHash() {
        const len = this.hashList.length;

        const start = this.byte*Math.pow(2,len-1);
        const end = this.byte*Math.pow(2,len)-1;

        if (len !== 0 && start > await this.getSize()) {
            // 파일전체를 읽었는지 확인
            this.calcFinish = true;
            return false;
        }

        const hash = crypto.createHash('md5');
        if (len === 0) {
            // console.log(0, this.byte-1);
            const rStream = fs.createReadStream(this.path, { start: 0, end: this.byte-1 });
            rStream.on('error', (err) => {
                console.error(`createReadStream error ${this.path} 0 ~ ${this.byte-1} ${err}`)
            });
            for await(const chunk of rStream) {
                hash.update(chunk);
            }
        }
        else {
            // console.log(start, end);
            const rStream = fs.createReadStream(this.path, { start, end });
            rStream.on('error', (err) => {
                console.error(`createReadStream error ${this.path} ${start} ~ ${end} ${err}`)
            });
            for await(const chunk of rStream) {
                hash.update(chunk);
            }
        }
        const digest = hash.digest();
        this.hashList.push(digest);
        return digest;
    }

    async *[Symbol.asyncIterator]() {
        for(var count=0; count < this.hashList.length; count+=1) {
            yield this.hashList[count];
        }
        var hash = null;
        while ((hash = await this.calcNextHash()) !== false ) {
            yield hash;
        }
    }
}