import { Stats } from 'fs';
import getStat from '../getStat.js';

describe('getStat', () => {
    test('getStat readable file', async () => {
        await getStat('readableFile').then((stat) => expect(stat).toBeInstanceOf(Stats));
    });

    test('getStat not readable file', async () => {
        await getStat('notReadableFile').then((stat) => expect(stat).toBe(false));
    });
});