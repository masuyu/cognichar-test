import FlexBetweenWrapper from "../../ui-elements/FlexBetweenWrapper"

const ButtonArea = ({
  currentQuestionId,
  questionList,
  answerList,
  setCurrentQuestionId,
  setPostAnswerList,
  setIsDoneAnswer
}) => {
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

  const submitScorebordStyle = "text-center px-4 py-1 w-2/3 border-0 rounded-xl bg-blue-600 hover:bg-blue-200 text-white";

  const handlePreQuestion = () => {
    setCurrentQuestionId(currentQuestionId - 1)
  }

  const handleNextQuestion = () => {
    setCurrentQuestionId(currentQuestionId + 1)
  }

  const handleSubmitScorebord = () => {
    setPostAnswerList(answerList);
    setIsDoneAnswer(true)
  }

  if (answerList.length === questionList.length) {
    return (
      <FlexBetweenWrapper justifyContentDirective="between">
        <div>
          <button className={preButtonStyle} onClick={handlePreQuestion} disabled={!isAllowPre()}>Pre</button>
          <button className={nextButtonStyle} onClick={handleNextQuestion} disabled={!isAllowNext()}>Next</button>
        </div>
        <button className={submitScorebordStyle} onClick={handleSubmitScorebord} >全問解答しました！ 結果へ</button>
      </FlexBetweenWrapper>
    )
  } else {
    return (
      <FlexBetweenWrapper justifyContentDirective="between">
        <div>
          <button className={preButtonStyle} onClick={handlePreQuestion} disabled={!isAllowPre()}>Pre</button>
          <button className={nextButtonStyle} onClick={handleNextQuestion} disabled={!isAllowNext()}>Next</button>
        </div>
      </FlexBetweenWrapper>
    )
  }
}

export default ButtonArea;
