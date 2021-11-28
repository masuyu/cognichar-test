import { useState, useEffect } from 'react';
import axios from 'axios';
import TopPage from './TopPage.js';
import MainContainer from './MainContainer.js';
import myConfig from "../myConfig.json";

const App = () => {
  const [ questionList, setQuestionList ] = useState([])
  const [ currentQuestionId, setCurrentQuestionId ] = useState(0)
  const [ answerList, setAnswerList ] = useState([]);
  const [ isDoneLoad, setIsDoneLoad ] = useState(false)

  useEffect(() => {
    axios
        .get(myConfig.questionApiPath)
        .then(response => {
          setQuestionList(response.data)
          setIsDoneLoad(true)
        })
  }, [])

  const ButtonArea = () => {
    if (answerList.length === questionList.length) {
      return (
        <>
          <button className="px-4 py-1 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white" onClick={handlePreQuestion} disabled={currentQuestionId - 1 <= 0}>Pre</button>
          <button className="px-4 py-1 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white" >結果へ</button>
          <button className="px-4 py-1 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white" onClick={handleNextQuestion} disabled={currentQuestionId + 1 > questionList.length}>Next</button>
        </>
      )
    } else {
      return (
        <>
          <button className="px-4 py-1 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white" onClick={handlePreQuestion} disabled={currentQuestionId - 1 <= 0}>Pre</button>
          <button className="px-4 py-1 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white" onClick={handleNextQuestion} disabled={currentQuestionId + 1 > questionList.length}>Next</button>
        </>
      )
    }
  }

  const QuestionBase = () => {
    return (
      <>
        <QuestionList parameter={questionList} />

        <div className="flex justify-between my-10">
          <ButtonArea />
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
          <div className="py-10 flex justify-center h-32">
            <p className="mx-10 ">
              {output.text}
            </p>
          </div>
          <div className="px-2.5 h-80">
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
          <div className="mx-20 my-5 px-2 py-2 border-0 rounded-xl bg-green-300" onClick={()=>handleSetAnswer(answerChoice.question_id, answerChoice.id)}>
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

  const handlePreQuestion = () => {
    setCurrentQuestionId(currentQuestionId - 1)
  }

  const handleNextQuestion = () => {
    setCurrentQuestionId(currentQuestionId + 1)
  }

  const handleSetAnswer = (questionId ,answerChoiceId) => {
    const answerObject = {
      questionId: questionId,
      answerChoiceId: answerChoiceId,
    }
    let cheaked = answerList.filter((e) => {
      return e.questionId !== questionId
    })
    cheaked.push(answerObject)
    setAnswerList(cheaked)
    console.log(cheaked);
    if (questionId + 1 <= questionList.length) {
      setCurrentQuestionId(questionId + 1)
    }
  }

  return (
    <MainContainer content={<Content />} />
  );
}

export default App;
