import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export class CoordinateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: {
        x: null,
        y: null,
        chartName: ""
      },
      invalid: true
    };
    this.add = this.add.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChangeChart = this.handleChangeChart.bind(this);
    this.close = this.close.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  setCoordinate(e, inputName) {
    const newState = Object.assign({}, this.state);
    newState.coordinates[inputName] = e.target.value;
    newState.invalid = !this.validate();
    this.setState(newState);
  }
  validate() {
    return Boolean(
      this.state.coordinates.x &&
        this.state.coordinates.y &&
        this.state.coordinates.chartName
    );
  }
  add() {
    this.props.add(this.state.coordinates);
    this.resetState();
  }
  handleChangeChart(event) {
    const newState = Object.assign({}, this.state);
    newState.coordinates.chartName = event.target.value;
    newState.invalid = !this.validate();
    this.setState(newState);
  }
  resetState() {
    const newState = Object.assign({}, this.state);
    newState.coordinates.chartName = "";
    newState.coordinates.x = null;
    newState.coordinates.y = null;
    newState.invalid = true;
    this.setState(newState);
  }
  close() {
    this.resetState();
    this.props.onClose();
  }
  render() {
    const menuItems = [];
    this.props.chartNames.forEach((name, index) => {
      menuItems.push(
        <MenuItem key={index} value={name}>
          {name}
        </MenuItem>
      );
    });
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Enter coordinate values</DialogTitle>
        <DialogContent className="container" style={{ paddingTop: "3%" }}>
          <FormControl fullWidth>
            <InputLabel shrink>Chart Name</InputLabel>
            <Select
              value={this.state.coordinates.chartName}
              onChange={this.handleChangeChart}
            >
              {menuItems}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            onChange={event => this.setCoordinate(event, "x")}
            className="input-item"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">X</InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            onChange={event => this.setCoordinate(event, "y")}
            type="number"
            className="input-item"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Y</InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.add}
            disabled={this.state.invalid}
          >
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={this.close}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default CoordinateForm;
