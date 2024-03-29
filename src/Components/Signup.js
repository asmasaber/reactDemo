import React from "react";
import asEntity from "Hocs/asEntity";
import { observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Form from "Components/Form/Builder";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import { countries, interests, gender } from "Utils/Data";
import {
  isRequied,
  minLength,
  maxLength,
  checkPassword,
  matches
} from "Services/Validators";

@observer
class SignupForm extends Form {
  componentDidMount() {
    this.initializeForm({
      name: {
        validators: [isRequied(), minLength(3), maxLength(25)]
      },
      password: {
        validators: [isRequied(), checkPassword()]
      },
      repeatPassword: {
        validators: [
          isRequied(),
          matches(() => this.formValues.password, "Passwords Not Matched")
        ]
      },
      country: {},
      bio: {
        validators: [maxLength(250)]
      },
      ref: {},
      interests: {},
      gender: {
        value: 1
      },
      rememberMe: {}
    });
  }

  submit = () => {
    this.formSubmitted = true;
    this.validateForm();
    if (this.isFormValid) {
      this.props.post(this.formValues);
    } else {
      this.showErrors();
    }
  };

  render() {
    /* eslint-disable */
    const { isFormValid, isFormSubmitted } = this;
    const {
      TextField,
      Select,
      AutoComplate,
      CheckboxList,
      RedioButtons,
      Checkbox
    } = this;
    if (this.isFormInitialized) {
      return (
        <Container maxWidth="md">
          <Grid container xs={6} justify="center">
            <FormGroup row>
              <TextField name="name" label="Name" fullWidth />
              <TextField name="password" label="Password" type="password" />
              <TextField
                name="repeatPassword"
                label="Confirm Password"
                type="password"
              />

              <Select
                name="country"
                label="Countries"
                options={countries}
                valueKey="id"
                isSearchable
              />
              <AutoComplate
                name="ref"
                valueKey="id"
                placeholder="Interests"
                options={interests}
                isMulti
                isSearchable
              />
              <TextField name="bio" label="Bio." multiline />
              <Grid xs={6}>
                <CheckboxList
                  label="Interests"
                  name="interests"
                  items={interests}
                  itemKey="name"
                />
              </Grid>
              <Grid xs={6}>
                <RedioButtons
                  label="Gender"
                  name="gender"
                  options={gender}
                  valueKey="id"
                  labelKey="value"
                />
              </Grid>
              <Grid xs={6}>
                <Checkbox name="rememberMe" label="Remember Me" />
              </Grid>
              <Grid xs={6}>              
                <Button  variant="contained" color="primary" onClick={this.submit}>
                  Signup
                </Button>
              </Grid>
            </FormGroup>
          </Grid>
        </Container>
      );
    } else return null;
  }
}

export default asEntity({ storeId: "user" })(SignupForm);
