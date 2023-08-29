import React from "react";
import axios from "axios";
import * as d3 from "d3";

class Graph extends React.Component {
  state = {
    data: [],
    svg: null,
    name: "",
    maxY: 10,
  };
  constructor(props) {
    super(props);
    this.state.name = props.name;
    this.state.data = props.data;
    if (props.maxY) this.state.maxY = parseInt(props.maxY);
  }

  componentDidUpdate(prevProps) {
    this.state.data = prevProps.data;
  }

  componentDidMount() {
    this.drawChart();
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    clearInterval(this.state.intervalIsSet);
  }

  drawChart() {
    const height = 300;
    const width = 700;

    // 2. Use the margin convention practice
    var margin = { top: 50, right: 50, bottom: 50, left: 50 };

    var svg = d3
      .select("#graph-" + this.state.name)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.state.svg = svg;
  }

  updateChart() {
    var state = this.state;
    var svg = state.svg;
    var dataset = state.data;
    const height = 300;
    const width = 700;

    if (svg == null) return;

    // The number of datapoints
    var minX = 0;
    var maxX = 20;
    var maxY = this.state.maxY;

    if (dataset.length > maxX) {
      minX = dataset.length - maxX;
      maxX = dataset.length;
    }

    // 5. X scale will use the index of our data
    var xScale = d3
      .scaleLinear()
      .domain([minX, maxX]) // input
      .range([0, width]); // output

    // 6. Y scale will use the randomly generate number
    var yScale = d3
      .scaleLinear()
      .domain([0, maxY]) // input
      .range([height, 0]); // output

    svg.selectAll(".axis").remove();

    // 3. Call the x axis in a group tag
    svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g").attr("class", "axis").call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 7. d3's line generator
    var line = d3
      .line()
      .x(function (d, i) {
        return xScale(i);
      }) // set the x values for the line generator
      .y(function (d) {
        return yScale(d);
      }) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

    //remove existing lines
    svg.selectAll(".line").remove();

    // 9. Append the path, bind the data, and call the line generator
    svg
      .append("path")
      .datum(dataset) // 10. Binds data to the line
      .attr("class", "line") // Assign a class for styling
      .attr("d", line); // 11. Calls the line generator
  }

  render() {
    const { name, data } = this.state;
    return (
      <div id={"graph-" + name}>
        <p>
          {name}: {data[data.length - 1]}
        </p>
        {this.updateChart()}
      </div>
    );
  }
}

export default Graph;
