import * as d3 from "d3";
interface data{ yVal:number }
interface timeData extends data{ time:Date };
interface numData extends data{ xVal:number };
/*****************************
 * X Axis Stuff
 *****************************/
/**
 * @brief Create the function to scale x data
 * @param data Data to create the axis from data.time or data.x
 * @param width Width of the SVG
 */
export const xScaleTime = (data:timeData[], width:number):d3.ScaleTime<number, number> => {
  return d3
        .scaleTime()
        .domain(
          d3.extent(data, (d) => {
            return d.time;
          })
        )
        .range([0, width]);
      
};
export const xScaleNum = (data:numData[], width:number):d3.ScaleLinear<number, number> => {
  return d3
        .scaleLinear()
        .domain(
          d3.extent(data, (d) => {
            return d.xVal;
          })
        )
        .range([0, width]);
}
/**
 * @brief Create the xAxis
 * @param height Height of the svg
 * @param scale Usually xScale, this is the function you use to place the data onto the page
 * @param selection The SVG element to append the x axis to
 */
export const xAxisCreate = (height, scale, selection) => {
  selection
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(scale));
};
export const xAxisUpdate = (height, scale, selection) => {
  selection.select(".x-axis").call(d3.axisBottom(scale));
};
/*****************************
 * Y Axis Stuff
 *****************************/
/**
 * @brief Create the scale for the yAxis
 * @param data
 */
export const yScale = (data: data[], height) => {
  return d3
    .scaleLinear()
    .domain([
      0,
      parseFloat(d3.max(data, (d) => {
        return String(d.yVal);
      })),
    ])
    .range([height, 0]);
};
/**
 * @brief Create the yAxis
 * @param scale Usually xScale, this is the function you use to place the data onto the page
 * @param selection The SVG element to append the x axis to
 */
export const yAxisCreate = (scale, selection) => {
  selection.append("g").attr("class", "y-axis").call(d3.axisLeft(scale));
};
export const yAxisUpdate = (scale, selection) => {
  selection.select(".y-axis").call(d3.axisLeft(scale));
};
/*****************************
 * General Axis stuff
 *****************************/
export const createAxis = (data: timeData[] | numData[], height, width, selection) => {
  // Create X scale
  let x;
  if(data[0].hasOwnProperty('xVal'))
  {
    x = xScaleNum(data as numData[], width)
  }
  else
  {
    x = xScaleTime(data as timeData[], width);
  }
  // Create the X axis
  xAxisCreate(height, x, selection);

  // Create Y scale
  let y = yScale(data, height);
  // Create the Y axis
  yAxisCreate(y, selection);
  return [x, y];
};
export const updateAxis = (data: timeData[] | numData[], height:number, width:number, selection) => {
  // Create X scale
  let x;
  if(data[0].hasOwnProperty('xVal'))
  {
    x = xScaleNum(data as numData[], width)
  }
  else
  {
    x = xScaleTime(data as timeData[], width);
  }
  
  // Create the X axis
  xAxisUpdate(height, x, selection);

  // Create Y scale
  let y = yScale(data, height);
  // Create the Y axis
  yAxisUpdate(y, selection);
  return [x, y];
};
/*****************************
 * General Graph stuff
 *****************************/
export const createChart = (type, data, height, width, selection) => {};
export const updateChart = (type, data, height, width, selection) => {};
