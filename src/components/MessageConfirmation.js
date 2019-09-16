import React, { Component } from "react";
import { Alert } from "reactstrap";

class MessageConfirmation extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        sentMessage: false
      });
    }, 1000);
  }
  render() {
    return (
      <Alert color="success">
        Message Sent!<span>✉️</span>
      </Alert>
    );
  }
}

export default MessageConfirmation;
