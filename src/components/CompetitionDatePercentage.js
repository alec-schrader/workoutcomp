import React from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import { Typography } from "@mui/material";

/**
 * Take the difference between the dates and divide by milliseconds per day.
 * Round to nearest whole number to deal with DST.
 */
function datediff(first, second) {    
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function getData(percent) {
  return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
}

const CompetitionDatePercentage = (dates) => {
  const totalDays = datediff(new Date(dates.startdate), new Date(dates.enddate))
  const daysPassed = datediff(new Date(dates.startdate), new Date())
  const daysleft = totalDays - daysPassed;
  const percentPassed = (daysPassed/totalDays) * 100;
  return (
    <div>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400} height={400}
            data={getData(percentPassed)}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: { fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={[{x: "", y: percentPassed}]}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle" verticalAnchor="middle"
                  x={200} y={200}
                  text={`${Math.round(percentPassed)}%`}
                  style={{ fontSize: 45 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
        <Typography variant="body1">
          {dates.startdate} - {dates.enddate}
          <br/>
          {daysleft} days left.
        </Typography>
      </div>  
    )
};

export default CompetitionDatePercentage;