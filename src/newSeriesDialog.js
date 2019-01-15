import React from "react";
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

export class NewSeriesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "", invalid: true };
    this.validate = this.validate.bind(this);
    this.close = this.close.bind(this);
    this.addSeries = this.addSeries.bind(this);
  }
  nameChange(event) {
    const newState = Object.assign({}, this.state);
    newState.name = event.target.value;
    newState.invalid = !this.validate();
    this.setState(newState);
  }
  addSeries() {
    this.props.addSeries({ name: this.state.name, color: this.state.color });
    this.resetState();
  }
  colorChange(event) {
    this.setState({ color: event.target.value, invalid: !this.validate() });
  }
  validate() {
    return Boolean(this.state.name && this.state.color);
  }
  resetState() {
    this.setState({ name: "", color: "", invalid: true });
  }
  close() {
    this.resetState();
    this.props.onClose();
  }
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>New Series</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={this.state.name}
            onChange={event => this.nameChange(event)}
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel shrink>Color</InputLabel>
            <Select
              value={this.state.color}
              onChange={event => this.colorChange(event)}
            >
              <MenuItem value={"red"}>Red</MenuItem>
              <MenuItem value={"green"}>Green</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
              <MenuItem value={"yellow"}>Yellow</MenuItem>
              <MenuItem value={"pink"}>Pink</MenuItem>
              <MenuItem value={"brown"}>Brown</MenuItem>
              <MenuItem value={"purple"}>Purple</MenuItem>
              <MenuItem value={"cyan"}>Cyan</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.addSeries}
            variant="contained"
            color="primary"
            disabled={this.state.invalid}
          >
            Add
          </Button>
          <Button onClick={this.close} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default NewSeriesDialog;
