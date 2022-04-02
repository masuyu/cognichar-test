import { useState, useEffect } from 'react';
import axios from 'axios';
import MainContainer from './MainContainer.js';
import myConfig from "../myConfig.json";
import TopPage from './pages/TopPage/index.js';
import ResultPage from './pages/ResultPage/index.js';
import QuestionPage from './pages/QuestionPage/index.js';

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
        <QuestionPage
          currentQuestionId={currentQuestionId}
          questionList={questionList}
          answerList={answerList}
          setCurrentQuestionId={setCurrentQuestionId}
          setPostAnswerList={setPostAnswerList}
          setIsDoneAnswer={setIsDoneAnswer}
          setAnswerList={setAnswerList}
        />
      )
    }
  }

  return (
    <MainContainer>
      <Content />
    </MainContainer>
  );
}

export default App;
