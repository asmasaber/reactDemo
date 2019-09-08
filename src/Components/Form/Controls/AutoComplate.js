import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

export default class AutoComplateControl extends React.Component {
  handleChange = selectedOption => {
    const { name, onChange } = this.props;
    onChange(name, selectedOption);
  };

  render() {
    const {
      options,
      isMulti,
      isSearchable,
      placeholder,
      valueKey,
      labelKey,
      error
    } = this.props;
    return (
      <FormControl fullWidth error={!!error}>
        <Select
          onChange={this.handleChange}
          options={options}
          isMulti={isMulti}
          isSearchable={isSearchable}
          placeholder={placeholder}
          getOptionValue={opt => opt[valueKey]}
          getOptionLabel={opt => opt[labelKey]}
        />
        <FormHelperText error={!!error}>{error}</FormHelperText>
      </FormControl>
    );
  }
}

AutoComplateControl.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func
};

AutoComplateControl.defaultProps = {
  name: "",
  error: "",
  label: "",
  labelKey: "label",
  valueKey: "value",
  placeholder: "",
  sMulti: false,
  isSearchable: false,
  options: [],
  onChange() {}
};
