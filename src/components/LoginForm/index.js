import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { authenticate } from '../../actions/auth';

class LoginForm extends Component {
  state = {
    fields: {
      email: '',
      password: '',
    },
    errors: {},
  };

  inputHandler = ({ target }) => {
    this.setState(
      {
        fields: {
          ...this.state.fields,
          [target.name]: target.value,
        },
      },
      () => this.validateField(target.name, true)
    );
  };

  fieldBlurHandler = ({ target }) => {
    this.validateField(target.name, true);
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (this.valid()) {
      this.props.login(this.state.fields).then(({ success, err }) => {
        if (success) {
          // this.props.history.push('/login');
        } else {
          this.setState({ errors: err });
        }
      });
    }
  };

  validateField = (field, updateState = false) => {
    const value = this.state.fields[field];
    let message = null;

    if (field === 'password' || field === 'passwordRepeat') {
      if (this.state.fields.password !== this.state.fields.passwordRepeat) {
        message = 'Passwords should be the same';
        field = 'passwordRepeat';
      }
    }

    if (updateState) {
      this.setState({
        errors: {
          ...this.state.errors,
          [field]: message,
        },
      });
    }

    return message;
  };

  valid = () => {
    const { name, balance } = this.state.fields;
    let valid = true;
    let errors = {};

    this.setState({ errors });

    return valid;
  };

  render() {
    const {
      fields: { email, password, passwordRepeat },
      errors,
    } = this.state;

    return (
      <div className="login-form">
        <form className="form" onSubmit={this.submitHandler}>
          <small>
            <Link to="/register">register</Link>
          </small>
          <div className="form-title">Log In</div>
          <div className="form-group">
            <div className="input-label">Email</div>
            <input
              name="email"
              type="email"
              value={email}
              required
              onChange={this.inputHandler}
              onBlur={this.fieldBlurHandler}
            />
            {errors['email'] && (
              <div className="input-error">{errors['email']}</div>
            )}
          </div>
          <div className="form-group">
            <div className="input-label">Password</div>
            <input
              name="password"
              type="password"
              value={password}
              required
              onChange={this.inputHandler}
              onBlur={this.fieldBlurHandler}
            />
            {errors['password'] && (
              <div className="input-error">{errors['password']}</div>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-md">
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const dispatchToPros = (dispatch) => ({
  login(data) {
    return dispatch(authenticate(data));
  },
});

export default withRouter(connect(null, dispatchToPros)(LoginForm));
