import React, { Component } from 'react';
import { login } from '../../actions/auth';

import { connect } from 'react-redux';

class LoginForm extends Component {
  state = {
    email: ''
  }

  inputHandler = (e) => {
    let {name, value} = e.target;

    this.setState({
      [name]: value
    })

  }

  formHandler = (e) => {
    e.preventDefault();

    this.props.dispatch(login(this.state.email));
    localStorage.setItem("email", this.state.email);
  }

  render () {
    return (
      <div className="login-form">
          <form className="form" onSubmit={this.formHandler}>
            <div className="form-title">
              Login
            </div>
            <div className="form-group">
              <div className="input-label">Email</div>
              <input 
                name="email" 
                type="email" 
                value={ this.state.email }
                onChange={ this.inputHandler }
              />
            </div>
            <div className="form-group">
              <button className="btn btn-md" >
                Login
              </button>
            </div>
          </form>
      </div>

    )
  }

}


export default connect()(LoginForm);