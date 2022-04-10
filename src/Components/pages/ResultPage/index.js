import ScoreRadarChart from "../../ui-parts/ScoreRadarChart"

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
    <div>
      <div>
        あなたは {typeName} です。
      </div>

      <ScoreRadarChart scoreData={resultDate.total_score} />
    </div>
  )
}

export default ResultPage

