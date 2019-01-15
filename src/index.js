import React from "react";
import ReactDOM from "react-dom";
import OptionSet from "./optionSet.js";
import Chart from "./charts.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import data from "./data.js";
import colors from "./colors.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardActions";

const cardStyles = { height: "41vw" };
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          chartType: "LineChart",
          data: data,
          xLabel: "X",
          yLabel: "Y",
          title: "Chart",
          legend: false,
          colors: colors,
          pieChart: ""
        }
      ],
      currentStep: 1
    };
    this.changeChart = this.changeChart.bind(this);
    this.addCoordinate = this.addCoordinate.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.switchChange = this.switchChange.bind(this);
    this.addSeries = this.addSeries.bind(this);
    this.removeSeries = this.removeSeries.bind(this);
    this.getCurrentState = this.getCurrentState.bind(this);
    this.addNewStep = this.addNewStep.bind(this);
    this.goBack = this.goBack.bind(this);
    this.selectPie = this.selectPie.bind(this);
  }
  goBack() {
    console.log(this.state);
    const newState = Object.assign({}, this.state);
    newState.history.splice(this.state.currentStep - 1, 1);
    newState.currentStep--;
    console.log(newState);
    this.setState(newState);
  }
  getCurrentState() {
    return JSON.parse(
      JSON.stringify(this.state.history[this.state.currentStep - 1])
    );
  }
  addNewStep(state) {
    const newState = Object.assign({}, this.state);
    newState.history.push({ ...state });
    newState.currentStep++;
    this.setState(newState);
  }
  changeChart(val) {
    const state = this.getCurrentState();
    state.chartType = val;
    this.addNewStep(state);
  }
  addCoordinate(value) {
    const state = this.getCurrentState();
    for (var i in state.data) {
      if (state.data[i].name === value.chartName) {
        if (Number(value.x)) {
          state.data[i].data.push([Number(value.x), Number(value.y)]);
        } else {
          state.data[i].data.push([value.x, Number(value.y)]);
        }
      }
    }
    this.addNewStep(state);
  }
  changeTitle(value) {
    const state = this.getCurrentState();
    state.title = value;
    this.addNewStep(state);
  }
  changeLabel(value, label) {
    const state = this.getCurrentState();
    state[label] = value;
    this.addNewStep(state);
  }
  switchChange(value) {
    const state = this.getCurrentState();
    state.legend = value;
    this.addNewStep(state);
  }
  selectPie(value) {
    this.setState({ pieChart: value });
  }
  removeSeries(value) {
    const state = this.getCurrentState();
    value.forEach(item => {
      for (let i of state.data) {
        if (i.name === item) {
          state.data.splice(state.data.indexOf(i), 1);
        }
      }
    });
    this.addNewStep(state);
  }
  addSeries(value) {
    const state = this.getCurrentState();
    state.data.push({ name: value.name, data: [] });
    state.colors.push(value.color);
    this.addNewStep(state);
  }
  render() {
    const state = this.getCurrentState();
    return (
      <Grid container direction="row" justify="center" spacing={16}>
        <Grid item xs={2}>
          <Card style={cardStyles}>
            <CardContent>
              <div style={{ margin: "auto" }}>
                <OptionSet
                  changeChart={this.changeChart}
                  addCoordinate={this.addCoordinate}
                  changeTitle={this.changeTitle}
                  defaultTitle={state.title}
                  changeLabel={this.changeLabel}
                  defaultXLabel={state.xLabel}
                  defaultYLabel={state.yLabel}
                  switchChange={this.switchChange}
                  chartNames={state.data.map(row => row.name)}
                  addSeries={this.addSeries}
                  removeSeries={this.removeSeries}
                  goBack={this.goBack}
                  backBlocked={this.state.currentStep === 1}
                  enableLegend={state.legend}
                  chartType={state.chartType}
                  selectPie={this.selectPie}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={cardStyles}>
            <CardContent style={{ marginTop: "8vw" }}>
              <Grid container direction="column">
                <Grid item align="center">
                  <Typography component="h5" variant="h5">
                    {state.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Chart
                    type={state.chartType}
                    data={state.data}
                    xLabel={state.xLabel}
                    yLabel={state.yLabel}
                    legend={state.legend}
                    colors={state.colors}
                    pieChart={this.state.pieChart}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
