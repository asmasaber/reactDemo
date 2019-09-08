import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class SelectControl extends React.Component {
  state = {
    selectedValue: ""
  };

  handleChange = value => {
    const { name } = this.props;
    this.props.onChange(name, value);
    this.setState({ selectedValue: value });
  };

  render() {
    const { name, helper, error, label, options, valueKey } = this.props;
    return (
      <FormControl variant="outlined" fullWidth error={!!error}>
        <InputLabel htmlFor={`${name}-select`}>{label}</InputLabel>
        <Select
          value={this.state.selectedValue}
          onChange={event => this.handleChange(event.target.value)}
          inputProps={{
            name: { name },
            id: `${name}-select`
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map(option => {
            return (
              <MenuItem key={option[valueKey]} value={option[valueKey]}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{error || helper}</FormHelperText>
      </FormControl>
    );
  }
}

SelectControl.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  helper: PropTypes.string,
  options: PropTypes.array,
  valueKey: PropTypes.string,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func
};

SelectControl.defaultProps = {
  label: "Select",
  name: "",
  value: "",
  options: [],
  valueKey: "value",
  error: "",
  helper: "",
  onChange() {}
};
