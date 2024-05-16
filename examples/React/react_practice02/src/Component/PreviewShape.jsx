import React, { useState, useEffect } from "react";

// Point to string 변환 (예: "10,10 290,150 10,290")

const Graph = ({ points = [] }) => {
  const [scaledPoints, setScaledPoints] = useState([""]);

  const pointsToString = (pointsValue) => {
    if (!pointsValue || pointsValue.length === 0) return "";
    return pointsValue
      .map((pointValue) => `${pointValue.x},${pointValue.y}`)
      .join(" ");
  };

  const scale = (point, points) => {
    // 모든 점 중에서 최대 x 및 y 값을 찾습니다.
    const maxX = Math.max(...points.map((p) => p.x));
    const maxY = Math.max(...points.map((p) => p.y));

    // scaleX과 scaleY를 계산합니다.
    const scaleX = 290 / maxX;
    const scaleY = 290 / maxY;

    // 축소해야 하는 경우 작은 비율을 선택하여 모든 점이 300x300 범위 내에 있도록 합니다.
    const scale = Math.min(scaleX, scaleY, 1); // 1은 이미 충분히 작은 경우를 처리하기 위함입니다.

    // 주어진 좌표가 축소 비율을 적용합니다.
    return {
      id: point.id,
      x: point.x * scale,
      y: point.y * scale,
    };
  };

  useEffect(() => {
    if (points.length === 0) return;
    const scaledPoints = points.map((point) => scale(point, points));
    const ReverseYPoints = scaledPoints.map((point) => ({
      id: point.id,
      x: point.x,
      y: 300 - point.y,
    }));
    setScaledPoints(ReverseYPoints);
  }, [points]);

  return (
    <div key={"div_Graph"}>
      <svg width="300" height="300" viewBox="0 0 300 300">
        <polygon
          points={pointsToString(scaledPoints)}
          fill="skyblue"
          stroke="black"
          strokeWidth="1"
        />
        {scaledPoints.length !== 0 &&
          points.length === scaledPoints.length &&
          scaledPoints.map((point, index) => {
            console.log(point);
            const dxMargin = point.x >= 290 && point.y <= 10 ? "-80px" : "-72px";
            return (
              <text
                key={`${index}_${point.id}`}
                x={point.x + 5}
                y={point.y + 5}
                fontSize="15"
                fill="black"
                textAnchor="large"
                dx={point.x >= 290 ? dxMargin : ".2em"}
                dy={point.y >= 290 ? "-15px" : "1em"}
              >
                {`${points[index].id}(${points[index].x},${points[index].y})`}
              </text>
            );
          })}
      </svg>
    </div>
  );
};

// 사용 예시
export default function PreViewShape(props) {
  const { rowdata = [] } = props;

  // 삼각형의 좌표 예시입니다. 추가 좌표를 받아 다각형을 그릴 수 있습니다.
  const points = [
    { id: 1, x: 10, y: 10 },
    { id: 2, x: 600, y: 10 },
    { id: 3, x: 250, y: 800 },
    { id: 4, x: 10, y: 250 },
  ];

  return <div>{rowdata && <Graph key={"Graph"} points={rowdata} />}</div>;
}
