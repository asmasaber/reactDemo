import React from "react";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";


export default class RadioGroupControl extends React.Component {
  
    handleChange = value => {
      const { name } = this.props;
      this.props.onChange(name, value);
    };

    render () {
      const { helper , error , value, label, options, valueKey, labelKey, required } = this.props;
      return (
        <FormControl component="fieldset" error={!!error} required={required}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            value={value}
            onChange={event => this.handleChange(event.target.value)}
          >
            {options.map((option) => {
              return (<FormControlLabel key={option[valueKey]} control={<Radio checked={option[valueKey] === value}/>} label={option[labelKey]}/>);
            })}
          </RadioGroup>
          <FormHelperText>{error || helper}</FormHelperText>
        </FormControl>
      );
    }
    
}

RadioGroupControl.propTypes = {
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
  labelKey: PropTypes.string,
  indeterminate: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func
};
  
RadioGroupControl.defaultProps = {
  label: "Select",
  name: "",
  options: [],
  valueKey: "value",
  labelKey: "name",
  error:"",
  helper:"",
  required:false,
  onChange() { }
};
  