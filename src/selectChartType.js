import React from "react";
import ReactDOM from "react-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SelectSeriesForPie from "./selectSeriesForPie.js";

export class SelectChartType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: this.props.type,
      labelWidth: 0,
      choosePieOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.chooseSeries = this.chooseSeries.bind(this);
  }
  handleChange(event) {
    if (event.target.value === "PieChart") {
      this.setState({ choosePieOpen: true, labelWidth: 0 });
    }
    this.setState({ chartType: event.target.value });
    this.props.select(event.target.value);
  }
  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }
  chooseSeries(value) {
    this.setState({ chartType: "PieChart" });
    this.props.selectPie(value);
  }
  closeDialog() {
    this.setState({ choosePieOpen: false });
  }
  render() {
    return (
      <FormControl fullWidth variant="outlined">
        <InputLabel
          htmlFor="chart-type-input"
          ref={ref => {
            this.InputLabelRef = ref;
          }}
        >
          Chart Type
        </InputLabel>
        <Select
          value={this.props.type}
          onChange={this.handleChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name="age"
              id="outlined-age-simple"
            />
          }
        >
          <MenuItem value={"LineChart"}>Line Chart</MenuItem>
          <MenuItem value={"ColumnChart"}>Column Chart</MenuItem>
          <MenuItem value={"BarChart"}>Bar Chart</MenuItem>
          <MenuItem value={"ScatterChart"}> Scatter Chart</MenuItem>
          <MenuItem value={"PieChart"}>Pie Chart</MenuItem>
        </Select>
        <SelectSeriesForPie
          seriesName={this.props.seriesName}
          open={this.state.choosePieOpen}
          close={this.closeDialog}
          chooseSeries={this.chooseSeries}
        />
      </FormControl>
    );
  }
}
export default SelectChartType;
