import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

export default class CheckboxListControl extends React.Component {
  selected = [];

  onChange = (item, state) => {
    const { name, onChange } = this.props;
    if (state) {
      this.selected.push(item);
    } else {
      this.selected.splice(this.selected.indexOf(item), 1);
    }
    onChange(name, this.selected);
  };
  render() {
    const classes = makeStyles(theme => ({
      root: {
        display: "flex"
      },
      formControl: {
        margin: theme.spacing(3)
      }
    }));

    const { label, required, items, error, helper, itemKey } = this.props;
    return (
      <FormControl
        variant="outlined"
        required={required}
        error={!!error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>
          {items.map(item => {
            return (
              <FormControlLabel
                key={item[itemKey]}
                control={
                  <Checkbox
                    checked={item.checked}
                    id={item[itemKey]}
                    onChange={e => this.onChange(e.target.id, e.target.checked)}
                  />
                }
                label={item.label}
              />
            );
          })}
        </FormGroup>
        <FormHelperText>{helper || error}</FormHelperText>
      </FormControl>
    );
  }
}

CheckboxListControl.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  itemKey: PropTypes.string,
  helper: PropTypes.string,
  items: PropTypes.array,
  required: PropTypes.bool,
  onChange: PropTypes.func
};

CheckboxListControl.defaultProps = {
  items: [],
  error: "",
  name: "",
  itemKey: "name",
  label: "",
  helper: "",
  required: false,
  onChange() {}
};
