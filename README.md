# deduplicater
CLI Remove Duplicate File

# How to use
## find 명령어
```
node app.js find --src "path1 path2 path3 ..."
ex) node app.js find --src="./src/__tests__/testFiles ./src/__tests__/testFiles2 ./src/__tests__/testFiles3"
-------------------------------------
실행결과
중복파일 검색 명령어가 실행되었습니다.
[
  './src/__tests__/testFiles',
  './src/__tests__/testFiles2',
  './src/__tests__/testFiles3'
] 스캔 시작
Scan: ./src/__tests__/testFiles
Scan: ./src/__tests__/testFiles2
Scan: ./src/__tests__/testFiles3
Found: 16 files
Duplicate File List
 - src/__tests__/testFiles3/g copy.txt
 - src/__tests__/testFiles3/g.txt
 - src/__tests__/testFiles/b copy.txt
 - src/__tests__/testFiles/b.txt
 - src/__tests__/testFiles/a copy 2.txt
 - src/__tests__/testFiles/a copy 3.txt
 - src/__tests__/testFiles/a copy.txt
 - src/__tests__/testFiles/a.txt
 - src/__tests__/testFiles/c copy.txt
 - src/__tests__/testFiles/c.txt
 - src/__tests__/testFiles2/d copy.txt
 - src/__tests__/testFiles2/d.txt
 - src/__tests__/testFiles2/e copy.txt
 - src/__tests__/testFiles2/e.txt
Duplicate Found: 14 files
```

# Test
```
npm run test
-------------------------------------
```

# 개발중인 기능들
- [x] 부분적으로 hash값을 계산해서 반환기능 -> FileInfo class
- [ ] 파일 중복 검사 모듈
- [ ] cli 입력 처리 모듈
