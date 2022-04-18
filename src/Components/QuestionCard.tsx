import React, {useState} from 'react';
import {questionPropType} from '../types/quiz_types'

export const QuestionCard: React.FC<questionPropType> = ({option, question, callBack}) => {
  // console.log(option, question);

  let [userSelection, setUserSelection] = useState('');

  const handleChange = (e:React.FormEvent<EventTarget>) => {
    const target = e.target as HTMLTextAreaElement;
    // console.log(target.value);
    setUserSelection(target.value);
  }


  return(
    <div className='question-container'>
      <div className='question'>
          {question}
      </div>

      <form onSubmit={(e:React.FormEvent<EventTarget>)=>{callBack(e, userSelection)}}
        className="question-form"
      >
          {
            option.map( (opt: string, ind: number) => {
                return(
                  <div key={ind}>
                    <label className='radio'>
                      <input
                        type='radio'
                        name='opt'
                        value={opt}
                        required
                        checked={userSelection === opt}
                        onChange={handleChange}
                      />
                      {opt}
                    </label>
                  </div>
                )
            })
          }
          <input type='submit' className='submit'/>
      </form>



    </div>
  )
};
