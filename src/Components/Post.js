import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";

import { observer } from "mobx-react";


import asEntity from "Hocs/asEntity";

import Text from "Components/Form/Inputs/Text";
import Form from "./Form/Builder";
import {isRequied, minLength, maxLength} from "Services/Validators";


const PostForm = observer(class extends Form {

  componentDidMount() {
    this.initializeForm({
      title:{
        validators:[
          isRequied,
          minLength(3),
          maxLength(25)
        ]
      },
      body:{
        validators:[
          isRequied,
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
    const {title, body} = this.formFields;

    return (
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <FormGroup row>
            <Grid item xs={12}>
              <Text
                label="Title"
                name="title"
                error={title && !title.isValid? title.error : ""}
                required= {title && title.validators.includes(isRequied)}
                fullWidth
                onChange={this.handleChange}
              />
              <Text
                label="Body"
                name="body"
                error={body &&!body.isValid? body.error : ""}
                required= {body && body.validators.includes(isRequied)}
                fullWidth
                multiline
                onChange={this.handleChange}
              />
              <Button variant="contained" color="primary" onClick={this.post}>Post</Button>
            </Grid>
          </FormGroup>
        </Grid>
      </Container>
    );
  }
});

export default asEntity({ storeId: "post" })(PostForm);