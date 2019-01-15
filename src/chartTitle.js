import React from "react";
import TextField from "@material-ui/core/TextField";

export class ChartTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.defaultTitle };
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
    this.props.changeTitle(event.target.value);
  }
  render() {
    return (
      <TextField
        onChange={this.handleTitleChange}
        label="Chart Title"
        value={this.props.defaultTitle}
        variant="outlined"
        fullWidth
      />
    );
  }
}
export default ChartTitle;
