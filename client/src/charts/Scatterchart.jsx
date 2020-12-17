// Linechart.js
import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
let margin = { top: 10, right: 30, bottom: 30, left: 60 };
function ScatterChart({ width, height, data }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("border", "1px solid black");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var svG = d3
      .select(ref.current)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // X scale and Axis
    var x = d3
      .scaleLinear()
      .domain([0, 100]) // This is the min and the max of the data: 0 to 100 if percentages
      .range([0, width]); // This is the corresponding value I want in Pixel
    svG
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // X scale and Axis
    var y = d3
      .scaleLinear()
      .domain([0, 100]) // This is the min and the max of the data: 0 to 100 if percentages
      .range([height, 0]); // This is the corresponding value I want in Pixel
    svG.append("g").call(d3.axisLeft(y));

    // Add 3 dots for 0, 50 and 100%
    svG
      .selectAll("whatever")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.x);
      })
      .attr("cy", function (d) {
        return y(d.y);
      })
      .attr("r", 7)
      .exit()
      .remove();
  }, [data, height, width]);
  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}
export default ScatterChart;
