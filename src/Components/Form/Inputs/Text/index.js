import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
  
export default class Text extends React.Component{

    handleChange = value => {
      const { name } = this.props;
      this.props.onChange(name, value);
    };
  
    render() {
      const { label, name , error, required, disabled, type, readOnly, multiline, defaultValue, fullWidth} =  this.props;
      return (
        <TextField
          name={name}
          required= {required}
          error={!!error}
          disabled={disabled}
          label={label}
          type={type}
          readOnly={readOnly}
          multiline={multiline}
          rows="4"
          defaultValue={defaultValue}
          helperText={!!error && error}
          onChange={e => this.handleChange(e.target.value)}
          fullWidth= {fullWidth}
          margin="normal"
          variant="outlined"
          
        />
      );
    }
}

Text.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  disabled:PropTypes.bool,
  readOnly: PropTypes.bool,
  multiline:PropTypes.bool, 
  fullWidth:PropTypes.bool, 
  onChange: PropTypes.func
};

Text.defaultProps = {
  label: "",
  error: "",
  type: "text",
  defaultValue: "",
  required: false,
  disabled: false,
  readOnly: false,
  multiline: false,
  fullWidth: false,
  onChange() {}
};

