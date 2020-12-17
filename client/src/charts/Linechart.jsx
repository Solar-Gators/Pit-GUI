// Linechart.js
import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import { createAxis, updateAxis } from "./utils";
let margin = { top: 10, right: 30, bottom: 30, left: 60 };
function LineChart({ width, height, data }) {
  const svgRef = useRef();

  useEffect(() => {
    let svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("border", "1px solid black")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "d3-graph-canvas");
    createAxis(data, height, width, svg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Get the current graph and move it so the axis show
    const svg = d3.select(svgRef.current);
    const selection = svg.select(".d3-graph-canvas");
    let [x, y] = updateAxis(data, height, width, selection);
    // Add the line
    const myLine = d3
      .line()
      .x((d) => x(d.time))
      .y((d) => y(d.yVal));

    selection
      .selectAll(".d3line")
      .data([data])
      .join("path")
      .attr("class", "d3line")
      .attr("d", (val) => myLine(val))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5);
  }, [data, width, height]);

  return (
    <div className="chart">
      <svg ref={svgRef}></svg>
    </div>
  );
}
export default LineChart;
