import React from "react";
import { observable, toJS } from "mobx";

import FormState from "./FormState";

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
      getForm() {
        return this.form;
      },
    });
  }

  initializeForm = (data) => {
    this.state.setForm(data);
  };

  handleChange = (name, value) => {
    const error = this.validateField(name, value);
    const form = new FormState({ ...toJS(this.state.form) });
    form[name].value = value;
    form[name].isValid= error? false : true;
    form[name].error= error;
    this.state.setForm(form);
  };

  validateField = (name, value) => {
    const form = new FormState({ ...toJS(this.state.form) });
    const field = form[name];

    let errorMessage;
    field.validators.some((validator) => {
      errorMessage = validator(value);
      if (errorMessage) {
        return true;
      }
    });
    return errorMessage;    

  }
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

  formFieldsgetfield(name) {
    return toJS(this.state.form)[name];
  }

  getfieldValue(name) {
    return toJS(this.state.form)[name].value;
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
}
