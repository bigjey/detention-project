import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';

import {
  createAccount,
  updateAccount,
  deleteAccount
} from '../../actions/accounts';
import {add} from '../../actions/flashes';
import {getAccountById} from '../../selectors/accounts';


class AccountForm extends Component {
  state = {
    fields: {
      name: '',
      balance: 0
    },
    errors: {},
    completed: false,
    newId: null
  }

  componentWillMount(){
    if (this.props.accountId && !this.props.account) {
      this.props.history.replace('/accounts');
      this.props.addFlash('Could not find account with this id, redirecting to list');
    }
    this.populate();
  }

  populate() {
    const {account} = this.props;

    if (account) {
      let fields = {};
      for (let field in this.state.fields) {
        if (account.hasOwnProperty(field)) {
          fields[field] = account[field];
        }
      }
      this.setState({
        fields: fields
      });
    }
  }

  delete = (id) => {
    this.props.deleteAccount(id)
      .then(({success}) => {
        if (success) {
          this.props.addFlash('Account has been deleted');
          this.props.history.push('/accounts');
        } else {
          this.props.addFlash('Something went wrong');
        }
      })
  }

  inputHandler = ({target}) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [target.name]: target.value
      }
    }, () => this.validateField(target.name, true))
  }

  fieldBlurHandler = ({target}) => {
    this.validateField(target.name, true);
  }

  submitHandler = (e) => {
    e.preventDefault();

    const {account} = this.props;
    let newId = null;

    if (this.valid()) {
      if (account) {
        this.props.updateAccount(account._id, this.state.fields)
          .then(({success, item}) => {
            if (success) {
              this.props.addFlash('Account has been update');
            } else {
              this.props.addFlash('Something went wrong');
            }

            this.setState({
              erorrs: {},
              completed: true
            })
          })
      } else {
        this.props.createAccount(this.state.fields)
          .then(({success, item}) => {
            if (success) {
              this.props.addFlash('Account has been created');
              newId = item._id;
            } else {
              this.props.addFlash('Something went wrong');
            }

            this.setState({
              erorrs: {},
              completed: true,
              newId
            })
          })
      };
    }
  }

  validateField = (field, updateState = false) => {
    const value = this.state.fields[field];
    let message = null;

    if (field === 'name') {
      if (value.trim().length === 0) {
        message = 'Field is requried';
      }
    }

    if (field === 'balance') {
      if (value.trim && value.trim().length === 0) {
        message = 'Field is requried';
      } else if (!field || Number(field) === NaN) {
        message = 'Not a valid number';
      }
    }

    if (updateState) {
      this.setState({
        errors: {
          ...this.state.errors,
          [field]: message
        }
      })
    }
      
    return message;
  }

  valid = () => {
    const {name, balance} = this.state.fields;
    let valid = true;
    let errors = {};

    Object.keys(this.state.fields).forEach(field => {
      let error = this.validateField(field);
      if (error) {
        errors[field] = error;
        valid = false;
      }
    })

    this.setState({errors});

    return valid;
  }

  render(){
    const {fields: {name, balance}, errors, completed, newId} = this.state;
    const {account} = this.props;

    const newMode = !this.props.account;

    if (completed && newId) return <Redirect to={`/accounts/${newId}`} />;

    return (
      <form className="form" onSubmit={this.submitHandler}>
        <div className="form-title">
          {newMode ? 'New Account' : 'Edit Account'}
        </div>
        <div className="form-group">
          <div className="input-label">Name</div>
          <input name="name" type="text"
            value={name}
            onChange={this.inputHandler}
            onBlur={this.fieldBlurHandler}
          />
          {errors['name'] && (
            <div className="input-error">{errors['name']}</div>
          )}
        </div>
        <div className="form-group">
          <div className="input-label">Balance</div>
          <input name="balance" type="number"
            value={balance}
            onChange={this.inputHandler}
            onBlur={this.fieldBlurHandler}
          />
          {errors['balance'] && (
            <div className="input-error">{errors['balance']}</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-md">
            {newMode ? 'Add' : 'Save'}
          </button>
          {!newMode && (
            <button
              type="button"
              style={{marginLeft: 50}}
              className="btn btn-sm btn-danger"
              onClick={() => this.delete(account._id)}
            >
              delete
            </button>
          )}
        </div>
      </form>
    );
  }
}


const stateToProps = (state, ownProps) => ({
  account: getAccountById(state, ownProps.accountId)
})

const dispatchToProps = dispatch => ({
  createAccount(data) {
    return dispatch(createAccount(data));
  },
  updateAccount(id, data) {
    return dispatch(updateAccount(id, data));
  },
  deleteAccount(id) {
    return dispatch(deleteAccount(id))
  },
  addFlash(message) {
    dispatch(add({
      id: uuid(),
      open: true,
      message,
      hideAfter: null
    }))
  }
})

export default withRouter(connect(stateToProps, dispatchToProps)(AccountForm));