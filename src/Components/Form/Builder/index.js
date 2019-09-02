import React from "react";
import { observer } from "mobx-react";
import { observable, toJS } from "mobx";

import FormState from "./FormState";

@observer
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

  handleChange = (name, value) => {
    const form = new FormState({ ...toJS(this.state.form) });
    form[name].value = value;
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
    for (const key in form) {
      values[key] = form[key].value;
    }
    return values;
  }

  get formFields() {
    const fields = {};
    const form = toJS(this.state.form);
    for (const key in form) {
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
    for (const key in form) {
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