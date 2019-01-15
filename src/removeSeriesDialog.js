import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export class RemoveSeriesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    this.close = this.close.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.close = this.close.bind(this);
    this.remove = this.remove.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  handleChange(event) {
    const newState = Object.assign({}, this.state);
    newState.series = event.target.value;
    this.setState(newState);
  }
  remove(event) {
    this.props.removeSeries(this.state.series);
    this.close();
  }
  close() {
    this.resetState();
    this.props.onClose();
  }
  resetState() {
    const newState = Object.assign({}, this.state);
    newState.series = [];
    this.setState(newState);
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
        <DialogTitle>Choose series to delete</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Series</InputLabel>
            <Select
              multiple
              value={this.state.series}
              onChange={this.handleChange}
            >
              {menuItems}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.remove}
            disabled={this.state.series.length === 0}
          >
            Remove
          </Button>
          <Button variant="contained" color="primary" onClick={this.close}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default RemoveSeriesDialog;
