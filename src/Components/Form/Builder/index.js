import React from "react";

import FormState from "./FormState";
import { observable, toJS } from "mobx";
import Controls from "Components/Form/Controls";

/* eslint-disable , react/no-direct-mutation-state */
export default class Form extends React.Component {

  state = observable({
    _form: {},
    submitted: false,
    isFormValid: true,
    showErrors: false,
    setForm(data) {
      this.form = new FormState({ ...data });
    },
  });

  constructor(props) {
    super(props);
    for (const [Key, Value] of Object.entries(Controls)) {
      this[Key] = props => (<Value {...props} {...this.commenProps(props.name)} />);
    }
  }

  initializeForm = (data) => {
    this.state.setForm(data);
  };


  validateField = (name, value) => {
    const field = new FormState({ ...toJS(this.state.form)})[name];

    let errorMessage;
    field.validators.some((validator) => {
      const isValid = validator.validate(value);
      if (!isValid) {
        errorMessage =  validator.message;
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

  commenProps = (name) => ({
    ...this.getformField(name),
    showError: this.showErrors,
    onChange: this.handleChange
  });

  get isFormValid() {
    return this.state.isFormValid;
  }

  get isFormSubmitted() {
    return this.state.submitted;
  }

  get showErrors() {
    return this.state.showErrors;
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
}
