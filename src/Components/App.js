import { useState, useEffect } from 'react';
import axios from 'axios';
import TopPage from './TopPage.js';
import MainContainer from './MainContainer.js';
import myConfig from "../myConfig.json";

const App = () => {
  const [ questionList, setQuestionList ] = useState([])
  const [ currentQuestionId, setCurrentQuestionId ] = useState(0)
  const [ isDoneLoad, setIsDoneLoad ] = useState(false)

  useEffect(() => {
    axios
        .get(myConfig.questionApiPath)
        .then(response => {
          setQuestionList(response.data)
          setIsDoneLoad(true)
        })
  }, [])

  const QuestionBase = () => {
    return (
      <>
        <QuestionList parameter={questionList} />

        <div className="flex justify-between my-10">
          <button className="" onClick={preQuestion} disabled={currentQuestionId - 1 <= 0}>Pre</button>
          <button className="" onClick={nextQuestion} disabled={currentQuestionId + 1 > questionList.length}>Next</button>
        </div>
      </>
    )
  }

  const QuestionList = ({parameter}) => {
    let question = parameter.find(question => question.id === currentQuestionId)
    return (
      <div className="mt-10">
        <Question output={question} />
      </div>
    )
  }

  const Question = ({output}) => {
    return (
      <div className="px-3 py-3 border-2 border-2 rounded-xl">
          <h1 className="text-xl py-1">Question. {output.id}</h1>
          <div className="py-10 flex justify-center">
            <p className="mx-10">
              {output.text}
            </p>
          </div>
          <div className="px-2.5">
            <ul>
              <AnswersChoiceList answerChoices={output.answer_choices} />
            </ul>
          </div>
      </div>
    )
  }

  const AnswersChoiceList = ({answerChoices}) => {
    return answerChoices.map(answerChoice => {
      return (
        <li key={answerChoice.question_id + "-" + answerChoice.id}>
          <div className="mx-20 my-5 px-2 py-2 border-0 rounded-xl bg-green-300">
            <p>
              {answerChoice.text}
            </p>
          </div>
        </li>
      )
    })
  }
  const Content = () => {
    if (currentQuestionId === 0) {
      return (
        <TopPage setCurrentQuestionId={setCurrentQuestionId} isDoneLoad={isDoneLoad} />
      )
    } else {
      return (
        <QuestionBase />
      )
    }
  }

  const preQuestion = () => {
    console.log(currentQuestionId)
    setCurrentQuestionId(currentQuestionId - 1)
  }

  const nextQuestion = () => {
    console.log(currentQuestionId)
    setCurrentQuestionId(currentQuestionId + 1)
  }

  return (
    <MainContainer content={<Content />} />
  );
}

export default App;
