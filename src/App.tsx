import React from 'react';  
import './App.css';
import questions from './Questions.json';

interface Question {
  Q: string,
  A: string
}

const qs = questions as Question[];
const randomize = (n: number) => {
  const arr = new Array(n);
  for(let i=0; i<n; i+=1) {
    arr[i] = i;
  }
  const newarr = [];
  while(arr.length) {
    const i = Math.floor(Math.random()*arr.length);
    newarr.push(arr[i]);
    arr.splice(i,1);
  }
  return newarr;
}

function Text(s: string) {
  return s.split('\n').map(piece => <><br/> {piece} </>)
}
function App() {
  const [list, setList] = React.useState<number[]>(() => randomize(qs.length));
  const currQ = list[list.length-1];
  const [showA, setShowA] = React.useState(false);
  const onNext = React.useCallback(() => {
    // Pick a new Question;
    list.pop();
    setList([...list]);
    setShowA(false);
  }, [list]);
  const onShowA = React.useCallback(() => {
    setShowA(true);
  }, []);

  return (
    <>
      <h1>{Text(qs[currQ].Q)}</h1>
      {showA && <h2>{Text(qs[currQ].A)}</h2>}
      <button onClick={onShowA}>Show Answer</button>
      <button onClick={onNext}>Next Question</button>
    </>
  );
}

export default App;
