import React, { useEffect, useState } from "react";
import BarChart from "./charts/Barchart";
import LineChart from "./charts/Linechart";
import ScatterChart from "./charts/Scatterchart";
import { Button, Col, Container } from "react-bootstrap";
import GraphModal from "./components/GraphModal";
import { getLineAndCharacterOfPosition } from "typescript";
const scatterData = [
  { x: 10, y: 20 },
  { x: 40, y: 90 },
  { x: 80, y: 50 },
];
const datas = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30],
];
const linearData = [
  [
    { xVal: 1, yVal: 1 },
    { xVal: 2, yVal: 2 },
    { xVal: 3, yVal: 3 },
    { xVal: 4, yVal: 4 },
    { xVal: 5, yVal: 5 },
    { xVal: 6, yVal: 6 },
    { xVal: 7, yVal: 7 },
  ],
  [
    { xVal: 1, yVal: 1 },
    { xVal: 2, yVal: 1 },
    { xVal: 3, yVal: 1 },
    { xVal: 4, yVal: 1 },
    { xVal: 5, yVal: 1 },
    { xVal: 6, yVal: 1 },
    { xVal: 7, yVal: 1 },
  ],
];
var i = 0;
function Graph() {
  const [data, setData] = useState(datas[0]);
  const [lineData, setDataL] = useState(linearData[0]);
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    generateData();
  }, []);
  const generateData = () => {
    for(let index= 0; index < 5; index++)
    {
      linearData[index] = [];
      for(let j = 0; j < 500; j++)
      {
        let date = new Date();
        date.setSeconds(date.getSeconds() + j);
        let val = Math.random() * (70 - 50) + 50;
        linearData[index].push({time: date, yVal: val});
      }
    }
  };
  const changeData = () => {
    setData(datas[i++]);
    if (i === datas.length) i = 0;
  };
  const changeLine = () => {
    setDataL(linearData[i++]);
    if (i === linearData.length) i = 0;
  };
  const createGraph = (width = 600, height = 400, data, type) =>
  {
    if(type === 'line')
    {
      setCharts(charts => [<LineChart width={width} height={height} data={data} />, ...charts]);
    }
  }
  return (
    <>
      
      <Container style={{ marginBottom: "2rem" }}>
      <GraphModal/>
        {/* <Col>
          <h2>Data</h2>
          <Button onClick={changeData}>Change Data</Button>
          <BarChart width={600} height={400} data={data} />
        </Col> */}
        <Col>
          <h2>Data</h2>
          <Button onClick={changeLine}>Change line</Button>
          <LineChart width={600} height={400} data={lineData} />
        </Col>
        {/* <Col>
          <h2>Data</h2>
          <Button onClick={changeLine}>Change line</Button>
          <ScatterChart width={600} height={400} data={scatterData} />
        </Col> */}
      </Container>
    </>
  );
}

export default Graph;
