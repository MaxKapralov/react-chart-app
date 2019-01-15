import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enableLegend: this.props.enableLegend };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }
  handleSwitchChange(event) {
    this.setState({ enableLegend: event.target.checked });
    this.props.switchChange(event.target.checked);
  }
  render() {
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.props.enableLegend}
              onChange={this.handleSwitchChange}
              color="primary"
            />
          }
          label="Legend"
        />
      </FormGroup>
    );
  }
}
export default Legend;
