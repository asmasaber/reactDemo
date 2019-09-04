import React from "react";
import PropTypes from "prop-types";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


import { observable } from "mobx";


export default class SelectControl extends React.Component {

  constructor(props) {
    super(props);
    this.inputLabel = observable.box(React.createRef());
    this.labelWidth = observable.box();
  }

  componentDidMount() {
    this.labelWidth = this.inputLabel.current.offsetWidth;
  }

  handleChange = value => {
    const { name } = this.props;
    this.props.onChange(name, value);
  };

  render() {

    const { name, helper , error , value, label, options, valueKey } = this.props;

    return (
      <FormControl variant="outlined" fullWidth error={!!error}>
        <InputLabel ref={this.inputLabel} htmlFor="outlined-select">
          {label}
        </InputLabel>
        <Select
          value={value}  
          onChange={event =>this.handleChange(event.target.value)}
          input={<OutlinedInput name={name} id="outlined-select" labelWidth={this.labelWidth}/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {options.map((option) => {
            return (<MenuItem key={option[valueKey]} value={option[valueKey]}>{option.name}</MenuItem>);
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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
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
  error:"",
  helper:"",
  onChange() { }
};

