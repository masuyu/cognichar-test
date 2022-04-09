import ButtonArea from "../../ui-parts/ButtonArea";

const QuestionPage = ({
  currentQuestionId,
  questionList,
  answerList,
  setCurrentQuestionId,
  setPostAnswerList,
  setIsDoneAnswer,
  setAnswerList
}) => {
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

  return (
    <>
      <ButtonArea
        currentQuestionId={currentQuestionId}
        questionList={questionList}
        answerList={answerList}
        setCurrentQuestionId={setCurrentQuestionId}
        setPostAnswerList={setPostAnswerList}
        setIsDoneAnswer={setIsDoneAnswer}
      />

      <QuestionList parameter={questionList} />
    </>
  )
}


export default QuestionPage;