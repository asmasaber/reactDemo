import React from "react";
import { observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";

import Form from "Components/Form/Builder";

import asEntity from "Hocs/asEntity";

import {isRequied, minLength, maxLength, checkPassword, matches} from "Services/Validators";

const SignupForm = observer(class extends Form {

  componentDidMount() {
    this.initializeForm({
      name:{
        validators:[
          isRequied,
          minLength(3),
          maxLength(25)
        ]
      },
      password:{
        validators:[
          isRequied, 
          checkPassword
        ]
      },
      repeatPassword:{
        matchWith:"password",
        validators:[
          isRequied, 
          matches
        ]
      },
      country:{
        validators:[
          isRequied, 
        ]
      },
      bio:{
        validators:[
          minLength(1),
          maxLength(250)
        ]
      },
      ref: {
        validators:[
          isRequied,
          minLength(2),
          maxLength(3)
        ]
      },
      interests: {
        validators:[
          isRequied,
          minLength(2),
          maxLength(3)
        ]
      },
      rememberMe:{}
    }); 
  }

  post = (e) => {
    e.preventDefault(); 
    this.handleSubmit(this.props.post);
  }

  
  render() {
    const countries = [
      {
        id:1,
        name:"Afghanistan"
      },
      {
        id:2,
        name:"Denmark"
      },
      {
        id:3,
        name:"France"
      },
      {
        id:4,
        name:"Egypt"
      },

    ];
    const interests = [
      {
        label: "Yoga",
        name:"yoga",
        id:"yoga",
      },
      {
        label: "Basketball",
        name:"basketball",
        id:"basketball"
      },
      {
        label: "Reading",
        name:"reading",
        id:"reading",
      },
      {
        label: "Traveling",
        name:"traveling",
        id:"traveling",
      },
      {
        label: "Volunteer Work",
        name:"volunteerWork",
        id:"volunteerWork"
      },
    ];
    return (
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <FormGroup row>
            <Grid item xs={12}>
              {this.renderTextBox({name: "name", label:"Name"})}
            </Grid>
            <Grid item xs={6}>
              {this.renderTextBox({name:"password", label:"Password", type:"password"})}
            </Grid>
            <Grid item xs={6}>
              {this.renderTextBox({name:"repeatPassword", label:"Confirm Password", type:"password"})}
            </Grid>
           
            <Grid item xs={12}>
              {this.renderTextBox({name:"bio", label:"Bio.", multiline:true})}
            </Grid>
            <Grid item xs={12}>
              {this.renderSelect({name:"country", options:countries, valueKey: "id", isSearchable:true, label:"Countries"})}
            </Grid>
            <Grid item xs={12}>
              {this.renderAutoComplate({name:"ref", options:interests, isMulti:true, valueKey: "id", isSearchable:true, placeholder:"Interests "})}
            </Grid>
            <Grid item xs={12}>
              {this.renderCheckBoxList({label:"Interests", name:"interests", items:interests, itemKey:"name"})}
            </Grid>
            <Grid item xs={12}>
              {this.renderCheckBox({name:"rememberMe", label:"Remember Me"})}
              <Button variant="contained" color="primary" onClick={this.post}>Signup</Button>
            </Grid>
            
          </FormGroup>
        </Grid>
      </Container>
    );
  }
});

export default asEntity({ storeId: "user" })(SignupForm);