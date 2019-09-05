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
    isFormInitialized: false,
    setForm(data) {
      this.form = new FormState({ ...data });
      this.isFormInitialized = true;
    }
  });

  constructor(props) {
    super(props);
    /* eslint-disable */
    for (const [Key, Value] of Object.entries(Controls)) {
      this[Key] = props => (
        <Value {...props} {...this.commenProps(props.name)} />
      );
    }
  }

  initializeForm = data => {
    this.state.setForm(data);
  };

  validateField = (name, value) => {
    const field = this.state.form[name];

    field.validators.some(validator => {
      field.error = "";
      field.isValid = validator.validate(value);
      if (!field.isValid) {
        field.error = validator.message;
        return true;
      }
    });
  };

  validateForm() {
    this.state.isFormValid = true;
    const form = new FormState({ ...toJS(this.state.form) });
    let isFormValid = true;
    for (var key in form) {
      form[key].validators.some(validator => {
        const isValid = validator.validate(form[key].value);
        if (!isValid) {
          form[key].isValid = isFormValid = false;
          form[key].error = validator.message;
          return true;
        }
      });
    }
    this.state.isFormValid = isFormValid;
    this.state.setForm(form);
  }

  handleChange = (name, value) => {
    this.state.form[name].value = value;
    this.validateField(name, value);
  };

  commenProps = name => ({
    ...this.getformField(name),
    showError: this.showError,
    onChange: this.handleChange
  });

  showErrors = () => {
    this.state.showErrors = true;
  };

  hideErrors = () => {
    this.state.showErrors = false;
  };

  getformField(name) {
    if (this.isFormInitialized) {
      return toJS(this.state.form)[name];
    }
  }

  getfieldValue(name) {
    if (this.isFormInitialized) {
      return toJS(this.state.form)[name].value;
    }
  }

  set formSubmitted(value) {
    this.state.submitted = true;
  }

  get isFormValid() {
    return this.state.isFormValid;
  }

  get isFormSubmitted() {
    return this.state.submitted;
  }

  get isFormInitialized() {
    return this.state.isFormInitialized;
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

  get showError() {
    return this.state.showErrors;
  }
}
