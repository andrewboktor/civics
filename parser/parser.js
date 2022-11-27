const fs = require('fs');
console.log('node ./parser/parser.js parser/100q.txt src/Questions.json');

const text = fs.readFileSync(process.argv[2]).toString();

const regex = /[0-9]+\. .+\n((?!\n\n\n)(\n(.*)))+/g

const matches = text.match(regex);

const baby = /([0-9]+\. .+)\n((\n.*)+)/

const qna = matches.map(m => {
    const full = m.match(baby);
    return {Q: full[1].trim(), A: full[2].trim()};
});

fs.writeFileSync(process.argv[3], JSON.stringify(qna, null, 2));

// var readlineSync = require('readline-sync');

// const ask = (q) =>{
//     readlineSync.question(q.Q);
//     console.log(q.A);
// }

// while(qna.length) {
//     const index = Math.floor(Math.random()*qna.length);
//     const q = qna[index];
//     ask(q);
//     qna.splice(index, 1);
//     console.log(qna.length, 'remaining');
// }
