import { Quiz, QuestionType } from '../types/quiz_types'


const shuffleArray = (array: any[]) =>
    [...array].sort( () => Math.random() - 0.5 );

export const getQuestion = async (totalQuest: number, level: string): Promise<QuestionType[] > => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuest}&difficulty=${level}&type=multiple`);
    const { results } = await res.json();
    // console.log(results);
    const quiz: QuestionType[] = results.map((quesObj: Quiz) => {
        return {
            question: quesObj.question,
            option: shuffleArray(quesObj.incorrect_answers.concat(quesObj.correct_answer)),
            answer: quesObj.correct_answer,
        }
    });
    return quiz;
}
