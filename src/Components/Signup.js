import React from "react";
import { observer } from "mobx-react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";

import Form from "Components/Form/Builder";

import asEntity from "Hocs/asEntity";

import {isRequied, minLength, maxLength, checkPassword, compare} from "Services/Validators";

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
        compateTo:"password",
        validators:[
          isRequied, 
          compare
        ]
      },
      bio:{
        validators:[
          minLength(1),
          maxLength(250)
        ]
      },
    }); 
  }

  post = (e) => {
    e.preventDefault(); 
    this.handleSubmit(this.props.post);
  }

  
  render() {
    return (
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <FormGroup row>
            <Grid item xs={12}>
              {this.renderTextBox({name: "name", label:"Name"})}
              {this.renderTextBox({name:"password", label:"Password", type:"password"})}
              {this.renderTextBox({name:"repeatPassword", label:"Confirm Password", type:"password"})}
              {this.renderTextBox({name:"bio", label:"Bio.", multiline:true})}
              <Button variant="contained" color="primary" onClick={this.post}>Signup</Button>
            </Grid>
          </FormGroup>
        </Grid>
      </Container>
    );
  }
});

export default asEntity({ storeId: "user" })(SignupForm);