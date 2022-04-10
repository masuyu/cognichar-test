import Camera from "../../ui-elements/CognitiveCharacteristicsDescriptions/Camera"
import ThreeDimansion from "../../ui-elements/CognitiveCharacteristicsDescriptions/ThreeDimansion"
import Fantasy from "../../ui-elements/CognitiveCharacteristicsDescriptions/Fantasy"
import Dictionary from "../../ui-elements/CognitiveCharacteristicsDescriptions/Dictionary"
import Radio from "../../ui-elements/CognitiveCharacteristicsDescriptions/Radio"
import Sound from "../../ui-elements/CognitiveCharacteristicsDescriptions/Sound"

const ResultDescription = {
  camera: <Camera />,
  three_dimansion: <ThreeDimansion />,
  fantsy: <Fantasy />,
  dictionary: <Dictionary />,
  radio: <Radio />,
  sound: <Sound />,
}

const ResultSummary = ({congnicharType}) => {

  const description = ResultDescription[congnicharType];

  return (
    <>
      {description}
    </>
  )
}

export default ResultSummary