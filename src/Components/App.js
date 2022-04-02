import { useState, useEffect } from 'react';
import axios from 'axios';
import TopPage from './TopPage.js';
import MainContainer from './MainContainer.js';
import ResultPage from './ResultPage.js';
import myConfig from "../myConfig.json";

const fetchResultToLambda = async (answerList) => {
  const answers = answerList.map((e) => {
    return e.answerChoiceId.toString(10)
  })
  const payload = {answers: answers};
  const headers = {
    "Content-Type": "application/json"
  };

  const res = await axios
    .post(myConfig.scorebordApiPath, payload, headers)
    .then(response => {
       return JSON.parse(response.data.body);
    });

  return res
}

const App = () => {
  const [ questionList, setQuestionList ] = useState([])
  const [ currentQuestionId, setCurrentQuestionId ] = useState(0)
  const [ answerList, setAnswerList ] = useState([])
  const [ postAnswerList, setPostAnswerList] = useState([]);
  const [ isDoneLoad, setIsDoneLoad ] = useState(false)
  const [ isDoneAnswer, setIsDoneAnswer ] = useState(false)
  const [ result, setResult ] = useState(null)

  useEffect(() => {
    axios
        .get(myConfig.questionApiPath)
        .then(response => {
          setQuestionList(response.data)
          setIsDoneLoad(true)
        })


    if (isDoneAnswer) {
        (async() => {
          const res = await fetchResultToLambda(postAnswerList);
          setResult(res)
        })()
    }

  }, [postAnswerList, isDoneAnswer])

  const ButtonArea = () => {
    const isAllowPre = () => {
      return currentQuestionId - 1 > 0
    }
    const preButtonStyle = isAllowPre()
      ? "px-4 py-1 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white"
      : "px-4 py-1 border-0 rounded-xl bg-gray-200 text-white cursor-not-allowed"


    const isAllowNext = () => {
      const copyAnswerList = answerList.slice()
      const countable = copyAnswerList.filter((e) => {
        return e.questionId === currentQuestionId
      })
      return currentQuestionId + 1 <= questionList.length && countable.length >= 1
    }
    const nextButtonStyle = isAllowNext()
      ? "px-4 py-1 ml-4 border-0 rounded-xl bg-gray-600 hover:bg-gray-200 text-white"
      : "px-4 py-1 ml-4 border-0 rounded-xl bg-gray-200 text-white cursor-not-allowed"

    if (answerList.length === questionList.length) {
      return (
        <div className="flex justify-between">
          <div>
            <button className={preButtonStyle} onClick={handlePreQuestion} disabled={!isAllowPre()}>Pre</button>
            <button className={nextButtonStyle} onClick={handleNextQuestion} disabled={!isAllowNext()}>Next</button>
          </div>
          <button className="px-4 py-1 border-0 rounded-xl bg-blue-600 hover:bg-blue-200 text-white" onClick={handleSubmitScorebord} >結果へ</button>
        </div>
      )
    } else {
      return (
        <div className="flex justify-between">
          <div>
            <button className={preButtonStyle} onClick={handlePreQuestion} disabled={!isAllowPre()}>Pre</button>
            <button className={nextButtonStyle} onClick={handleNextQuestion} disabled={!isAllowNext()}>Next</button>
          </div>
        </div>
      )
    }
  }

  const QuestionBase = () => {
    return (
      <>
        <ButtonArea />

        <QuestionList parameter={questionList} />
      </>
    )
  }

  const QuestionList = ({parameter}) => {
    let question = parameter.find(question => question.id === currentQuestionId)
    return (
      <div>
        <Question output={question} />
      </div>
    )
  }

  const Question = ({output}) => {
    return (
      <div>
          <h1 className="text-xl py-1">Question. {output.id}</h1>
          <div className="w-full pt-2 pb-10 flex justify-center h-48">
            <div className="w-full p-4 border-2 border-2 rounded-xl">
              <p>{output.text}</p>
            </div>
          </div>
          <div className="mx-5 h-80">
            <ul className="">
              <AnswersChoiceList answerChoices={output.answer_choices} />
            </ul>
          </div>
      </div>
    )
  }

  const AnswersChoiceList = ({answerChoices}) => {
    return answerChoices.map(answerChoice => {
      return (
        <li
          className="box-border w-full mb-4"
          key={answerChoice.question_id + "-" + answerChoice.id}
        >
          <div
            className="box-border px-2 py-2 h-16 w-full border-0 rounded-xl bg-green-300 cursor-pointer flex items-center"
            onClick={()=>handleSetAnswer(answerChoice.question_id, answerChoice.id)}
          >
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
    } else if (result) {
      return (
        <ResultPage resultDate={result} />
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
    if (questionId + 1 <= questionList.length) {
      setCurrentQuestionId(questionId + 1)
    }
  }

  const handleSubmitScorebord = () => {
    setPostAnswerList(answerList);
    setIsDoneAnswer(true)
  }

  return (
    <MainContainer content={<Content />} />
  );
}

export default App;
