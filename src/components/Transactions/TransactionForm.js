import React, { Component } from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import moment from 'moment';

import { create } from "../../actions/transactions";
import { add } from "../../actions/flashes";

class TransactionForm extends Component {
  state = {
    fields: {
      type: null,
      category: null,
      amount: 0,
      fromAccount: null,
      toAccount: null,
      description: "",
      created: Date.now()
    },
    errors: {},
    completed: false
  };

  componentWillMount() {
    const { type } = this.props;
    const newState = {
      ...this.state,
      fields: {
        ...this.state.fields,
        type: this.props.type
      }
    };

    if(type !== 'income') {
      newState.fields.fromAccount = this.props.accounts[0]._id 
    }

    if(type !== 'expense') {
      newState.fields.toAccount = this.props.accounts[0]._id
    }

    if(type !== 'transfer') {
      newState.fields.category = this.props.categories[0]._id 
    }

    this.setState(
      newState
    );
  }

  inputHandler = ({ target }) => {
    const { value, name } = target;

    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };

  fieldBlurHandler = ({ target }) => {
    this.validateField(target.name, true);
  };

  submitHandler = e => {
    e.preventDefault();
    
    if (this.props.type === 'transfer') {

      if (this.state.fields.fromAccount === this.state.fields.toAccount) {

        this.setState({
          ...this.state,
          errors: {toAccount: "you can't transfer from different accounts"}
        })  
        return 
      } else {
        this.setState({
          ...this.state,
          errors: {}
        })
      }
    } 

    this.props
      .createTransaction(this.state.fields)
      .then(({ success, item }) => {
        if (success) {
          this.props.addFlash("Transaction has been created");
        } else {
          this.props.addFlash("Something went wrong");
        }

        if (this.props.hideModal) {
          this.props.hideModal();
        }
      });
  };

  render() {
    const { type } = this.props;

    const {
      fields: { category, amount, toAccount, fromAccount, description, created },
      errors,
      completed
    } = this.state;

    return (
      <form className="form" onSubmit={this.submitHandler}>
        <div className="form-title">{this.props.type}</div>

        <div className="form-group">
          <div className="input-label">amount</div>
          <input
            name="amount"
            type="number"
            value={amount}
            onChange={this.inputHandler}
          />
          {errors["amount"] && (
            <div className="input-error">{errors["amount"]}</div>
          )}
        </div>

        { type !== "income" && (

          <div className="form-group">
            <div className="input-label">from account</div>
            <select
              name="fromAccount"
              value={fromAccount}
              onChange={this.inputHandler}
            >
              {this.props.accounts.map(a => (
                <option value={a._id}>{a.name}</option>
              ))}
            </select>
            {errors["fromAccount"] && (
              <div className="input-error">{errors["fromAccount"]}</div>
            )}
          </div>
        )}

        {type !== "expense" && (
          <div className="form-group">
            <div className="input-label">to account</div>
            <select
              name="toAccount"
              value={toAccount}
              onChange={this.inputHandler}
            >
              {this.props.accounts.map(a => (
                <option value={a._id}>{a.name}</option>
              ))}
            </select>
            {errors["toAccount"] && (
              <div className="input-error">{errors["toAccount"]}</div>
            )}
          </div>
        )}

        {type !== "transfer" && (
          <div className="form-group">
            <div className="input-label">category</div>
            <select
              name="category"
              value={category}
              onChange={this.inputHandler}
            >
              {this.props.categories.map(c => (
                <option value={c._id}>{c.name}</option>
              ))}
            </select>
            {errors["category"] && (
              <div className="input-error">{errors["category"]}</div>
            )}
          </div>
        )}

        <div className="form-group">
          <div className="input-label">description</div>
          <input
            name="description"
            type="text"
            value={description}
            onChange={this.inputHandler}
          />
          {errors["description"] && (
            <div className="input-error">{errors["description"]}</div>
          )}
        </div>

        <div className="form-group">
          <div className="input-label">date</div>
          <input
            name="created"
            type="date"
            value={moment(created).format('YYYY-MM-DD')}
            onChange={this.inputHandler}
          />
          {errors["created"] && (
            <div className="input-error">{errors["created"]}</div>
          )}
        </div>

        <div className="form-group">
          <button className="btn btn-md">Add</button>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          {this.props.hideModal && (
            <button className="btn" onClick={this.props.hideModal}>
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  }
}

const stateToProps = (state, ownProps) => ({
  accounts: state.accounts,
  categories: state.categories.filter(
    c => !c.deleted && c.type === ownProps.type
  )
});

const dispatchToProps = dispatch => ({
  createTransaction(data) {
    return dispatch(create(data));
  },
  addFlash(message) {
    dispatch(
      add({
        id: uuid(),
        open: true,
        message,
        hideAfter: 5000
      })
    );
  }
});

export default connect(stateToProps, dispatchToProps)(TransactionForm);