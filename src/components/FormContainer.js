import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
class FormContainer extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name ..."
            onChange={this.props.handleInputChange}
          />
          <Label for="message">Message</Label>
          <Input
            type="textarea"
            name="message"
            id="message"
            placeholder="Enter a message ..."
            onChange={this.props.handleInputChange}
          />
        </FormGroup>
        <Button
          color={!this.props.validateFormInput() ? "secondary" : "success"}
        //   color="success"
          type="submit"
          disabled={!this.props.validateFormInput()}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default FormContainer;
