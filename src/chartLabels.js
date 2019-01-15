import React from "react";
import TextField from "@material-ui/core/TextField";

export class ChartLabels extends React.Component {
  constructor(props) {
    super(props);
    this.state = { label: this.props.label };
    this.changeLabel = this.changeLabel.bind(this);
  }
  changeLabel(event) {
    const name = event.target.name;
    const value = event.target.value;
    const newState = Object.assign({}, this.state);
    newState.label = value;
    this.setState(newState);
    this.props.changeLabel(value, name);
  }
  render() {
    return (
      <TextField
        onChange={this.changeLabel}
        label={this.props.label + " Label"}
        value={this.props.label}
        name={this.props.name}
        variant="outlined"
        fullWidth
      />
    );
  }
}
export default ChartLabels;
