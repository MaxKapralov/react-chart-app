import React from "react";
import ReactChartkick, {
  PieChart,
  LineChart,
  ColumnChart,
  BarChart,
  ScatterChart
} from "react-chartkick";
import Highcharts from "highcharts";

ReactChartkick.addAdapter(Highcharts);
export class Chart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch (this.props.type) {
      case "LineChart":
        return (
          <LineChart
            data={this.props.data}
            xtitle={this.props.xLabel}
            ytitle={this.props.yLabel}
            legend={this.props.legend}
            colors={this.props.colors}
          />
        );
      case "ColumnChart":
        return (
          <ColumnChart
            data={this.props.data}
            xtitle={this.props.xLabel}
            ytitle={this.props.yLabel}
            legend={this.props.legend}
            colors={this.props.colors}
          />
        );
      case "BarChart":
        return (
          <BarChart
            data={this.props.data}
            xtitle={this.props.xLabel}
            ytitle={this.props.yLabel}
            legend={this.props.legend}
            colors={this.props.colors}
          />
        );
      case "ScatterChart":
        return (
          <ScatterChart
            data={this.props.data}
            xtitle={this.props.xLabel}
            ytitle={this.props.yLabel}
            legend={this.props.legend}
            colors={this.props.colors}
          />
        );
      case "PieChart":
        let data;
        this.props.data.forEach(d => {
          if (d.name === this.props.pieChart) {
            data = d.data;
          }
        });
        return (
          <PieChart
            data={data}
            xtitle={this.props.xLabel}
            ytitle={this.props.yLabel}
            legend={this.props.legend}
          />
        );
      default:
        return (
          <LineChart
            data={this.props.data}
            xtitle={this.props.xLabel}
            ytitle={this.props.yLabel}
            legend={this.props.legend}
            colors={this.props.colors}
          />
        );
    }
  }
}
export default Chart;
