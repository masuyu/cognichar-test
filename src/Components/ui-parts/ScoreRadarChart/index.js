import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
import FlexBetweenWrapper from "../../ui-elements/FlexBetweenWrapper";

const ScoreRadarChart = ({ scoreData }) => {
  const protData = Object.entries(scoreData).map(([key, value]) => ({
    "subject": key,
    "A": value,
    "fullMark": 80
  }));

  return (
    <FlexBetweenWrapper justifyContentDirective="center">
      <RadarChart
        cx={200}
        cy={200}
        outerRadius={150}
        width={400}
        height={400}
        data={protData}
      >
      <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 50]} />
        <Radar dataKey="A" stroke="#86efac" fill="#86efac" fillOpacity={0.6} />
      </RadarChart>
    </FlexBetweenWrapper>
  )
}

export default ScoreRadarChart