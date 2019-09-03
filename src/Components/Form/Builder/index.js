import React from "react";
import { observable, toJS } from "mobx";

import FormState from "./FormState";
import {isRequied, matches} from "Services/Validators";

import Text from "Components/Form/Inputs/Text";
import Checkbox from "Components/Form/Inputs/Checkbox";
import CheckboxList from "Components/Form/Inputs/CheckboxList";
import AutoComplate from "Components/Form/Inputs/AutoComplate";

/* eslint-disable , react/no-direct-mutation-state */
export default class Form extends React.Component {

  state = {};

  constructor(props) {
    super(props);
    this.state = observable({
      _form: {},
      submitted: false,
      isFormValid: true,
      setForm(data) {
        this.form = new FormState({ ...data });
      },
    });
  }

  initializeForm = (data) => {
    this.state.setForm(data);
  };

  validateField = (name, value) => {
    const form = new FormState({ ...toJS(this.state.form) });
    const field = form[name];
    let errorMessage;
    field.validators.some((validator) => {
      errorMessage = validator === matches? validator(value, form[field.matchWith].value) : validator(value);
      if (errorMessage) {
        return true;
      }
    });
    return errorMessage;    
  }

  validateForm() {
    const form = new FormState({ ...toJS(this.state.form) });
    let isFormValid = true;
    for (var key in form) {
      const field = form[key];
      field.validators.some((validator) => {
        const errorMessage = validator(field.value);
        field.error = errorMessage;
        if (errorMessage) {
          field.isValid = isFormValid = false;
          return true;
        }
      });
    }
    return { isFormValid, form };
  }

  handleChange = (name, value) => {
    const error = this.validateField(name, value);
    const form = new FormState({ ...toJS(this.state.form) });
    form[name].value = value;
    form[name].isValid= error? false : true;
    form[name].error= error;
    this.state.setForm(form);
  };

  handleSubmit = (action) => {
    const validationState = this.validateForm();
    this.state.submitted = true;
    this.state.isFormValid = validationState.isFormValid;
    this.state.setForm(validationState.form);
    this.isFormValid && action(this.formValues);
  };

  get isFormValid() {
    return this.state.isFormValid;
  }

  get isFormSubmitted() {
    return this.state.submitted;
  }

  get formValues() {
    const values = {};
    const { form } = this.state;
    for (var key in form) {
      values[key] = form[key].value;
    }
    return values;
  }

  get formFields() {
    const fields = {};
    const form = toJS(this.state.form);
    for (var key in form) {
      fields[key] = form[key];
    }
    return fields;
  }

  getformField(name) {
    if(this.state.form)
      return toJS(this.state.form)[name];
  }

  getfieldValue(name) {
    return toJS(this.state.form)[name].value;
  }

  renderTextBox = (props) => {
    const field= this.getformField(props.name);
    return (<Text
      {...props}
      fullWidth
      error={field && !field.isValid? field.error : ""}
      required= {field && field.validators.includes(isRequied)}
      onChange={this.handleChange}
    />);
  }

  renderCheckBox = (props) => {
    return (<Checkbox
      {...props}
      onChange={this.handleChange}
    />);
  }

  renderCheckBoxList = (props) => {
    const field= this.getformField(props.name);
    return (<CheckboxList
      {...props}
      error={field && !field.isValid? field.error : ""}
      required= {field && field.validators.includes(isRequied)}
      onChange={this.handleChange}
    />);
  }

  renderAutoComplate = (props) => {
    const field= this.getformField(props.name);
    return (<AutoComplate
      {...props}
      onChange={this.handleChange}
      value ={field && field.value}
    />);
  }

}
