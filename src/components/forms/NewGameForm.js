import React from "react";
import { Form, Message, Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import InlineError from "../messages/InlineError";

class NewGameForm extends React.Component {
  state = {
    data: {
      gamename: "",
      topRow: [1, 2, 3],
      middleRow: [4, 5, 6],
      bottomRow: [7, 8, 0]
    },
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.gamename) errors.gamename = "Can't be blank!";
    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.gamename}>
          <label htmlFor="gamename">Game Name</label>
          <input
            type="text"
            id="gamename"
            name="gamename"
            placeholder="Sliding Puzzle"
            value={data.gamename}
            onChange={this.onChange}
          />
        </Form.Field>

        {errors.gamename && <InlineError text={errors.gamename} />}
        <Button primary>Create Game</Button>
      </Form>
    );
  }
}

NewGameForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default NewGameForm;
