import React from "react";
import { VictoryStack, VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip, VictoryTheme, VictoryLegend } from "victory";

const transformData = function (dataset) {
  let ret = []
  ret.push(dataset.map((data) => {
    return { x: data.username.substring(0,5), y: data.cardio.points, label: `Cardio: ${data.cardio.points}` }
  }));
  ret.push(dataset.map((data) => {
    return { x: data.username.substring(0,5), y: data.strength.points, label: `Strength: ${data.strength.points}` }
  }));
  ret.push(dataset.map((data) => {
    return { x: data.username.substring(0,5), y: data.wellness.points, label: `Wellness: ${data.wellness.points}` }
  }));
  return ret;
};

const LeaderboardChart = (props) => {
  const data = props.data;
  const ticks = data.map((data) => data.username.substring(0,5))

  return (
    <div>
      <VictoryChart domainPadding={{ x: 30, y: 20 }} theme={VictoryTheme.material}>
        <VictoryStack labelComponent={<VictoryTooltip/>}>
          {transformData(data).map((data, i) => {
            return <VictoryBar data={data} key={i} />;
          })}
        </VictoryStack>
        <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
        <VictoryAxis tickFormat={ticks} />
        <VictoryLegend x={125} y={50}
          orientation="horizontal"
          data={[
            { name: "Cardio" },
            { name: "Strength" },
            { name: "Wellness" }
          ]}
        />
      </VictoryChart>
    </div>
  );
};

export default LeaderboardChart;
