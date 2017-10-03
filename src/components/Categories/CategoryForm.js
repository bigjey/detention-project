import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import uuid from 'uuid/v4';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import {addCategory, editCategory} from '../../actions/categories';
import {add} from '../../actions/flashes';

class CategoryForm extends Component {

  componentWillMount() {
    if (this.props.category) {
      this.setState({
        fields: {
          ...this.props.category
        }
      })
    }
  }

  state = {
    fields: {
      id: uuid(),
      type: 'income',
      name: '',
      deleted: false
    },
    errors: {},
    completed: false,
    newId: null
  }

  submitHandler = (e) => {
    e.preventDefault();

    const {category} = this.props;
    let newId = null;

    if(this.valid()) {
      if (category) {
        this.props.editCategory(category.id, this.state.fields);
        this.props.addFlash('Category has been updated');
      } else {
        newId = uuid();
        this.props.addCategory({
          ...this.state.fields,
          id: newId
        });
        this.props.addFlash('Category has been created');
      };

      this.setState({
        errors: {},
        completed: true
      });
    }
  }

  inputHandler = ({target}) => {
    this.setState({
      fields: {
          ...this.state.fields,
          [target.name]: target.value
        }
      },
      () => this.validateField(target.name, true)
    )
  }

  validateField = (field, updateState = false) => {
    const val = this.state.fields[field];
    let message = null;

    if (field === 'name') {
      if (val.trim().length === 0) {
        message = 'Field is requried';
      }
    };

    if (updateState) {
      this.setState({
        errors: {
          ...this.state.errors,
          [field]: message
        }
      })
    };

    return message;
  }

  fieldBlurHandler = ({target}) => {
    this.validateField(target.name, true);
  }

  valid = (field = null) => {
    let valid = true;
    let errors = {};

    ['name'].forEach(field => {
      let error = this.validateField(field);
      if (error) {
        errors[field] = error;
        valid = false;
      }
    })

    this.setState({errors});

    return valid;
  }

  render() {
    const {fields: {type, name}, errors, completed} = this.state;
    const newMode = !this.props.category;

    if (completed) return <Redirect to={`/categories`} />;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.submitHandler}
        >
          <div className="form-title">
            {newMode ? 'New Category' : 'Edit Category'}
          </div>
          <div className="form-group">
            <div className="input-label">Name</div>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.inputHandler}
              onBlur={this.fieldBlurHandler}
            />
            {errors['name'] && (
              <div className="input-error">{errors['name']}</div>
            )}
          </div>
          <div className="form-group">
            <div className="input-label">Type</div>
            <RadioGroup
              value={type}
              name="type"
              onChange={this.inputHandler}
              row
            >
              <FormControlLabel value="income" control={<Radio />} label="Income" />
              <FormControlLabel value="expense" control={<Radio />} label="Expense" />
            </RadioGroup>
          </div>
          <div className="form-group">
            <button className="btn btn-md">
              {newMode ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const stateToProps = (state, ownProps) => {
  return {
    category: state.categories.find(c => c.id === ownProps.id)
  };
}

const dispatchToProps = dispatch => ({
  addCategory(data) {
    dispatch(addCategory(data));
  },
  editCategory(id, data) {
    dispatch(editCategory(id, data));
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

export default connect(stateToProps, dispatchToProps)(CategoryForm);