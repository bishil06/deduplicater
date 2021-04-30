import yargs from 'yargs';
import scanDirs from './scanDirs.js';

yargs.version('0.0.1');

yargs.command({
    command: 'find',
    describe: '--src="/test, /test2, ..." \n 중복파일 검색 명렁어 입니다.',
    handler: (argv) => {
        const dirs = argv.src.split(' ');
        console.log('중복파일 검색 명령어가 실행되었습니다.');
        console.log(dirs, '스캔 시작');
        scanDirs(...dirs);
        
    },
    builder: {
        src: {
            describe: '검색할 폴더경로 ex) --src="/test, /test2, ..."',
            demandOption: true,
            type: 'string',
        },
    },
});

export default yargs;