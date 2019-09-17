import React, { Component } from "react";
import { Alert } from "reactstrap";

class MessageConfirmation extends Component {
  // componentDidMount() {
  //   this.props.resetForm()
  // }
  render() {
    return (
      <Alert color="success">
        Message Sent!<span>✉️</span>
      </Alert>
    );
  }
}

export default MessageConfirmation;
