import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import asEntity from "Hocs/asEntity";
import UserSelect from "./UserSelect";

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      date: new Date().toISOString().slice(0, -8),
      tags: [],
      hasAttachment: false,
    };
  }

  selectUser = selectedUser => {
    this.setState({ tags: selectedUser });
  };

  handleTextChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <FormGroup row>
            <Grid item xs={12}>
              <TextField
                id="title"
                label="Title"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.title}
                onChange={this.handleTextChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <UserSelect
                onChange={this.selectUser}
                selectedOption={this.state.tags}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="body"
                label="Body"
                multiline
                rows="4"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.body}
                onChange={this.handleTextChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="datetime-local"
                label="Date"
                type="datetime-local"
                defaultValue={this.state.date}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox checked={this.state.hasAttachment} value="hasAttachment" />
                }
                label="Upload Attachment"
              />
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
          </FormGroup>
        </Grid>
      </Container>
    );
  }
}

export default asEntity({ storeId: "post" })(PostForm);
