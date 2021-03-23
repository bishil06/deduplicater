import isReadableFile from '../isReadableFile.js';

describe('isReadableFile', () => {
    test('isReadableFile readable file',async () => {
        await isReadableFile('readableFile').then((r) => expect(r).toBe(true));
    })

    test('isReadableFile not readable file', async () => {
        // notReadableFile permision --wx-wx-wx
        await isReadableFile('notReadableFile').then((r) => expect(r).toBe(false));
    })
});