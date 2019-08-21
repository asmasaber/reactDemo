/* eslint-disable react/prop-types */
import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import asEntity from "Hocs/asEntity";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postId: 1,
      body: "test"
    };
  }

  componentDidMount() {
    this.props.get(1);
  }
  create = () => {
    this.props.post(this.state);
  };
  update = () => {
    this.props.put(this.state);
  };

  render() {
    const classes = makeStyles(theme => ({
      "@global": {
        body: {
          backgroundColor: theme.palette.common.white
        }
      },
      paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
      },
      form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
      },
      submit: {
        margin: theme.spacing(3, 0, 2)
      }
    }));

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.create}
          >
            Create Comment
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.update}
          >
            update Comment
          </Button>
        </div>
      </Container>
    );
  }
}


export default asEntity({ storeId: "comment" })(Comment);
