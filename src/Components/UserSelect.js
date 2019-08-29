import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

export default class UserSelect extends React.Component {
    
    handleChange = selectedOption => {
      this.props.onChange(selectedOption);
    };
  
    render() {
      const { selectedOption } = this.props;
  
      return (
        <Select
          label="Tags"
          margin="normal"
          variant="outlined"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          className={this.props.className}
          isMulti
          fullWidth
          isSearchable
        />
      );
    }
}
