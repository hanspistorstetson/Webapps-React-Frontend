import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      password_confirmation: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: err.response.data.errors,
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};

    if (!data.password) errors.password = "Can't be blank!";
    if (!data.password_confirmation)
      errors.confirmation_password = "Please retype your password";
    if (data.password !== data.password_confirmation)
      errors.password = "Passwords must match";

    return errors;
  };

  render() {
    const { data, loading, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={errors.password ? !!errors.password : undefined}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it Secure!"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field
          error={
            errors.password_confirmation
              ? !!errors.password_confirmation
              : undefined
          }
        >
          <label htmlFor="password_confirmation">Password</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="Type it again!"
            value={data.password_confirmation}
            onChange={this.onChange}
          />
          {errors.password_confirmation && (
            <InlineError text={errors.password_confirmation} />
          )}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
