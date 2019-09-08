import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

export default class TextFieldControl extends React.Component {
  handleChange = value => {
    const { name } = this.props;
    this.props.onChange(name, value);
  };

  render() {
    const {
      id,
      label,
      showError,
      error,
      required,
      disabled,
      type,
      readOnly,
      multiline,
      defaultValue,
      fullWidth,
      isValid
    } = this.props;

    return (
      <TextField
        id={id}
        name={name}
        required={required}
        error={showError && !isValid}
        disabled={disabled}
        label={label}
        type={type}
        readOnly={readOnly}
        multiline={multiline}
        defaultValue={defaultValue}
        helperText={showError && error}
        onChange={e => this.handleChange(e.target.value)}
        fullWidth={fullWidth}
        rows="4"
      />
    );
  }
}

TextFieldControl.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  showError: PropTypes.bool,
  isValid: PropTypes.bool,
  onChange: PropTypes.func
};

TextFieldControl.defaultProps = {
  label: "",
  error: "",
  type: "text",
  defaultValue: "",
  required: false,
  disabled: false,
  readOnly: false,
  multiline: false,
  fullWidth: true,
  showError: false,
  onChange() {}
};
