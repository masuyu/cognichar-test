import ScoreRadarChart from "../../ui-parts/ScoreRadarChart"
import ResultSummary from "../../ui-parts/ResultSummary"
import FlexBetweenWrapper from "../../ui-elements/FlexBetweenWrapper"

const CognicharType = {
  camera: "写真タイプ",
  three_dimansion: "三次元映像タイプ",
  fantsy: "言語映像タイプ",
  dictionary: "言語抽象タイプ",
  radio: "聴覚言語タイプ",
  sound: "聴覚＆音タイプ",
}

const ResultPage = ({resultDate}) => {

  const typeName = CognicharType[resultDate.cognichar_type]

  return (
    <div className="lg:px-1 lg:px-20 xl:px-40 2xl:px-64">
      <div>
        あなたは {typeName} です。
      </div>

      <div className="lg:px-1 lg:px-20 xl:px-40 2xl:px-64">
        <ScoreRadarChart scoreData={resultDate.total_score} />
      </div>

      <ResultSummary congnicharType={resultDate.cognichar_type}/>

      <FlexBetweenWrapper justifyContentDirective='center'>
        <a href="/" className="px-4 py-1 border-0 rounded-xl bg-blue-600 hover:bg-blue-200 text-white">戻る</a>
      </FlexBetweenWrapper>
    </div>
  )
}

export default ResultPage

