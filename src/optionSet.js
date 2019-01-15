import React from "react";
import Button from "@material-ui/core/Button";
import CoordinateForm from "./coordinateForm.js";
import SelectChartType from "./selectChartType.js";
import Legend from "./legend.js";
import NewSeriesDialog from "./newSeriesDialog.js";
import ChartTitle from "./chartTitle.js";
import ChartLabels from "./chartLabels.js";
import RemoveSeriesDialog from "./removeSeriesDialog.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export class OptionSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCoordinateOpened: false,
      newSeriesOpened: false,
      removeSeriesOpened: false
    };
    this.addCoordinates = this.addCoordinates.bind(this);
    this.addSeries = this.addSeries.bind(this);
  }
  handleOpen(event, val) {
    const newState = Object.assign({}, this.state);
    newState[val] = true;
    this.setState(newState);
  }
  handleClose(event, val) {
    const newState = Object.assign({}, this.state);
    newState[val] = false;
    this.setState(newState);
  }
  addCoordinates(value) {
    this.props.addCoordinate(value);
    this.handleClose(null, "newCoordinateOpened");
  }
  addSeries(value) {
    this.props.addSeries(value);
    this.handleClose(null, "newSeriesOpened");
  }
  render() {
    return (
      <List>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            onClick={(event, val) =>
              this.handleOpen(event, "newCoordinateOpened")
            }
            fullWidth
          >
            Add coordinates
          </Button>
          <CoordinateForm
            open={this.state.newCoordinateOpened}
            onClose={(event, val) =>
              this.handleClose(event, "newCoordinateOpened")
            }
            add={this.addCoordinates}
            chartNames={this.props.chartNames}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(event, val) => this.handleOpen(event, "newSeriesOpened")}
          >
            Add New Series
          </Button>
          <NewSeriesDialog
            open={this.state.newSeriesOpened}
            addSeries={this.addSeries}
            onClose={(event, val) => this.handleClose(event, "newSeriesOpened")}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={(event, val) =>
              this.handleOpen(event, "removeSeriesOpened")
            }
          >
            Remove series
          </Button>
          <RemoveSeriesDialog
            open={this.state.removeSeriesOpened}
            onClose={(event, val) =>
              this.handleClose(event, "removeSeriesOpened")
            }
            chartNames={this.props.chartNames}
            removeSeries={this.props.removeSeries}
          />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.goBack}
            fullWidth
            disabled={this.props.backBlocked}
          >
            Go Back
          </Button>
        </ListItem>
        <ListItem>
          <SelectChartType
            select={this.props.changeChart}
            type={this.props.chartType}
            seriesName={this.props.chartNames}
            selectPie={this.props.selectPie}
          />
        </ListItem>
        <ListItem>
          <ChartTitle
            changeTitle={this.props.changeTitle}
            defaultTitle={this.props.defaultTitle}
          />
        </ListItem>
        <ListItem>
          <ChartLabels
            changeLabel={this.props.changeLabel}
            label={this.props.defaultXLabel}
            name={"xLabel"}
          />
        </ListItem>
        <ListItem>
          <ChartLabels
            changeLabel={this.props.changeLabel}
            label={this.props.defaultYLabel}
            name={"yLabel"}
          />
        </ListItem>
        <ListItem>
          <Legend
            switchChange={this.props.switchChange}
            enableLegend={this.props.enableLegend}
          />
        </ListItem>
      </List>
    );
  }
}
export default OptionSet;
