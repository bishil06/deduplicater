export default async function isSameFile(fInfoA, fInfoB) {
   const [aIno, bIno] = await Promise.all([fInfoA.getIno(), fInfoB.getIno()]);
   if (aIno === bIno) {
       return true;
   }

   const asyncIterA = fInfoA[Symbol.asyncIterator]();
   const asyncIterB = fInfoB[Symbol.asyncIterator]();
   while(true) {
       const [hashA, hashB] = await Promise.all([asyncIterA, asyncIterB].map(iter => iter.next()));
    //    console.log(hashA, hashB);
       if (hashA.done === true || hashB.done === true) {
           return true;
       }
       else {
           if (hashA.value.compare(hashB.value) !== 0) {
               return false;
           }
       }
   }
}