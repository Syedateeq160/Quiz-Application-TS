import React, { useEffect, useState } from 'react';
import './App.css';

import {getQuestion} from './services/services'
import {QuestionType} from './types/quiz_types';
import {QuestionCard} from './Components/QuestionCard';

function App() {

  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [current, setCurrent] = useState(0);
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [flag, setFlag] = useState(0);


  useEffect( () => {
    async function getQuizQuestion() {
      const question = await getQuestion(5, 'easy');
      // console.log(question);
      setQuiz(question);
    }
    getQuizQuestion();
  }, [flag]);


  const handleSubmit = (e:React.FormEvent<EventTarget>, userSelection:string) => {
    // console.log(e);
    e.preventDefault();

    // console.log(userSelection);
    // console.log(quiz[current].answer);
    let ans: QuestionType = quiz[current];
    if( userSelection === ans.answer ){
      setScore(++score);
    }

    if(current !== quiz.length - 1)
      setCurrent(++current)
    else
    {
      // alert('your score: ' + score + "out of: " + quiz.length);
      setShowResult(true);
      setCurrent(0);
      setScore(0);
    }
  };

  const RestartQuiz = () => {
    setShowResult(false);
    setFlag(++flag)
    console.log(flag);
  }

  // console.log(quiz);

  if(!quiz.length){
    return <h1 className='loadingfont'>Loading</h1>
  }

  if(showResult){
    return (
      <div className='question-container result-container'>
          <h2>Result</h2>
          <p className='result-text'>
              Final Score <b> {score} </b> / <b> {quiz.length} </b>
          </p>
          <input type='button' value='Try Again?' onClick={RestartQuiz}/>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>The Quiz App</h1>
      <p><i>By Syed Ateeq</i></p>
      <QuestionCard
        option={quiz[current].option}
        question={quiz[current].question}
        callBack={handleSubmit}
      />
    </div>
  );
}

export default App;
