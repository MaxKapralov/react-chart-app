import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

export class SelectSeriesForPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { labelWidth: 0, chosenSeries: "", valid: false };
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.chooseSeries = this.chooseSeries.bind(this);
  }
  handleChange(event) {
    this.setState({ chosenSeries: event.target.value });
    if (event.target.value !== "") {
      this.setState({ valid: true });
    }
  }
  close() {
    this.setState({ chosenSeries: "", valid: false });
    this.props.close();
  }
  chooseSeries() {
    this.setState({ chosenSeries: "", valid: false });
    this.props.chooseSeries(this.state.chosenSeries);
    this.props.close();
  }
  render() {
    const menuItems = [];
    this.props.seriesName.forEach((name, index) => {
      menuItems.push(
        <MenuItem key={index} value={name}>
          {name}
        </MenuItem>
      );
    });
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>Choose series for Pie Chart</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Series</InputLabel>
            <Select
              value={this.state.chosenSeries}
              onChange={this.handleChange}
            >
              {menuItems}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.valid}
            onClick={this.chooseSeries}
          >
            Choose
          </Button>
          <Button variant="contained" color="secondary" onClick={this.close}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default SelectSeriesForPie;
