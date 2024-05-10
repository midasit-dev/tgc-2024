import React from 'react';
import { Stage, Layer, Line, Rect, Text  } from 'react-konva';


const shapeCSS = {
  fill: 'rgba(0, 0, 0, 0.5)',
  stroke: 'black',
  strokeWidth: 1,
};

export default function PreviewShape({ Rowdata }) {
  // 각 좌표를 평탄화하고 Konva의 도형에 맞는 형식으로 변환
  const flattenedPoints = Rowdata.reduce((acc, { x, y }) => [...acc, x*100, y*100], []);

  const drawShape = () => {
    switch (Rowdata.length) {
      case 3:
        // 삼각형
        return (
          <>
            <Line points={flattenedPoints} {...shapeCSS} closed />
            {Rowdata.map((row) => (
              <Text
                key={row.id}
                x={row.x * 100}
                y={row.y * 100}
                text={String(row.id)}
                fontSize={10}
                fontFamily='Pretendard'
                fill='black'
                offsetX={10} // 텍스트 위치 조정
                offsetY={5}
              />
            ))}
            </>
        );
      case 4:
        // 사각형
        // 사각형의 경우, x, y를 시작점으로 하고 넓이와 높이를 계산해야 하므로 별도의 처리가 필요
        const [x1, y1, x2, y2, x3, y3] = flattenedPoints;
        const rectWidth = Math.abs(x3 - x1);
        const rectHeight = Math.abs(y2 - y1);
        return <Rect x={x1} y={y1} width={rectWidth} height={rectHeight} {...shapeCSS} />;
      case 5:
        // 오각형
        return <Line points={flattenedPoints} {...shapeCSS} closed />;
      default:
        return null;
    }
  };

  return (
    <Stage width={280} height={280} style={{display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
      <Layer draggable of>
        {drawShape()}
      </Layer>
    </Stage>
  );
};