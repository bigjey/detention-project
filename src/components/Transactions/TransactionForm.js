import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';

import {create} from '../../actions/transactions';
import {add} from '../../actions/flashes';

class TransactionForm extends Component {
  state = {
    fields: {
      type: null,
      category: null,
      from: {
        amount: 0,
        account: ''
      },
      to: {
        amount: 0,
        account: ''
      },
      description: ''
    },
    errors: {},
    completed: false
  }

  componentWillMount() {
    this.setState({
      fields: {
        ...this.state.fields,
        type: this.props.type,
        to: {
          ...this.state.fields.to,
          account: this.props.accounts[0]._id
        },
        category: this.props.categories[0]._id
      }
    })
  }

  inputHandler = ({target}) => {
    const [key1, key2 = null] = target.name.split('.');

    console.log(key1, key2);

    this.setState({
      fields: {
        ...this.state.fields,
        [key1]: key2 ? {...this.state.fields[key1], [key2]: target.value} : target.value
      }
    })
  }

  fieldBlurHandler = ({target}) => {
    this.validateField(target.name, true);
  }

  submitHandler = (e) => {
    e.preventDefault();

    const {account} = this.props;

    this.props.createTransaction(this.state.fields)
      .then(({success, item}) => {
        if (success) {
          this.props.addFlash('Transaction has been created');
        } else {
          this.props.addFlash('Something went wrong');
        }

        if (this.props.hideModal) {
          this.props.hideModal();
        }
      })
  }

  render(){
    const {fields: {category, to, from, description}, errors, completed} = this.state;

    return (
      <form className="form" onSubmit={this.submitHandler}>
        <div className="form-title">
          {this.props.type}
        </div>

        <div className="form-group">
          <div className="input-label">amount</div>
          <input name="to.amount" type="number"
            value={to.amount}
            onChange={this.inputHandler}
          />
          {errors['to.amount'] && (
            <div className="input-error">{errors['to.amount']}</div>
          )}
        </div>

        <div className="form-group">
          <div className="input-label">category</div>
          <select name="category" value={category} onChange={this.inputHandler}>
            {this.props.categories.map(c => (
              <option value={c._id}>{c.name}</option>
            ))}
          </select>
          {errors['category'] && (
            <div className="input-error">{errors['category']}</div>
          )}
        </div>

        <div className="form-group">
          <div className="input-label">account</div>
          <select name="to.account" value={to.account} onChange={this.inputHandler}>
            {this.props.accounts.map(a => (
              <option value={a._id}>{a.name}</option>
            ))}
          </select>
          {errors['to.account'] && (
            <div className="input-error">{errors['to.account']}</div>
          )}
        </div>

        <div className="form-group">
          <div className="input-label">description</div>
          <input name="description" type="text"
            value={description}
            onChange={this.inputHandler}
          />
          {errors['description'] && (
            <div className="input-error">{errors['description']}</div>
          )}
        </div>

        <div className="form-group">
          <button className="btn btn-md">
            Add
          </button>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
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
  categories: state.categories.filter(c => !c.deleted && c.type === ownProps.type),
})

const dispatchToProps = dispatch => ({
  createTransaction(data) {
    return dispatch(create(data));
  },
  addFlash(message) {
    dispatch(add({
      id: uuid(),
      open: true,
      message,
      hideAfter: 5000
    }))
  }
})

export default connect(stateToProps, dispatchToProps)(TransactionForm);