import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class Text extends React.Component {

  handleChange = value => {
    const { name } = this.props;
    this.props.onChange(name, value);
  };

  render() {

    const { checked, name, label, value, disabled, indeterminate } = this.props;

    return (
      <FormControlLabel
        control={
          <Checkbox 
            name={name}
            value={value} 
            checked={checked} 
            indeterminate={indeterminate} 
            disabled={disabled}
            onChange={e => this.handleChange(e.target.checked)}
          />
        }
        label={label}
      />

    );
  }
}

Text.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func
};

Text.defaultProps = {
  label: "",
  name: "",
  value: "",
  disabled: false,
  onChange() { }
};

