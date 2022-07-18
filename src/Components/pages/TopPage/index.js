import FlexBetweenWrapper from "../../ui-elements/FlexBetweenWrapper"

const TopPage = ({ setCurrentQuestionId, setResult, preResult}) => {
  const handleSetCurrentQuestionId = () => {
    setCurrentQuestionId(1)
  }

  const handleSetPreResult = () => {
    const res = JSON.parse(preResult)

    setResult(res)
  }

  const PreResultLink = () => {
    if (preResult) {
      return (
        <FlexBetweenWrapper justifyContentDirective={"end"}>
          <div className="pt-16">
            <p>
              <span className="text-sm">以前のテスト結果があります</span>
              <a href="#/" onClick={handleSetPreResult} className="px-4 py-1 text-blue-600 cursor-pointer">&gt;前回の結果をみる</a>
            </p>
          </div>
        </FlexBetweenWrapper>
      )
    }
  }

  return (
    <div>
      <div className="lg:px-1 lg:px-20 xl:px-40 2xl:px-64">
        <section>
          <div className="py-5">
            <p>このページは３５問の質問に答えることで</p>
            <p>あなたの認知特性がわかるテストアプリです。</p>
          </div>
          <div>
            <h1 className="text-xl pb-3">認知特性とは？</h1>
            <div className="px-8 py-8 mx-10 border-0 rounded-xl bg-gray-200">
              <p>人が外部から情報を得る手段の傾向特性のことです。</p>
            </div>
          </div>
          <div className="py-5">
            <p>自分の認知特性を知ることで</p>
            <p>効率のいい情報の取得方法・学習方法を発見できます。</p>
          </div>
        </section>
        <FlexBetweenWrapper justifyContentDirective={"around"}>
          <div className="py-5">
            <a href="#/" onClick={handleSetCurrentQuestionId} className="px-4 py-1 border-0 rounded-xl bg-blue-600 hover:bg-blue-200 text-white">診断スタート</a>
          </div>
        </FlexBetweenWrapper>
        <PreResultLink />
      </div>
    </div>
  )
}

export default TopPage;