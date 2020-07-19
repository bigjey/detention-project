import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel, CircularProgress } from '@material-ui/core';

import { createCategory, editCategory } from '../../actions/categories';
import { add } from '../../actions/flashes';

class CategoryForm extends Component {
  componentWillMount() {
    if (this.props.category) {
      this.setState({
        fields: {
          ...this.props.category,
        },
      });
    }
  }

  state = {
    fields: {
      type: 'income',
      name: '',
    },
    errors: {},
    completed: false,
    loading: false,
  };

  submitHandler = (e) => {
    e.preventDefault();

    const { category } = this.props;

    if (this.valid()) {
      if (category) {
        this.props.editCategory(category.id, this.state.fields);
        this.props.addFlash('Category has been updated');
      } else {
        this.setState({
          loading: true,
        });
        this.props
          .create(this.state.fields)
          .then(({ success, item, errors }) => {
            if (success) {
              this.props.addFlash(`Category ${item.name} has been created`);
              this.setState({
                loading: false,
                completed: true,
                errors: {},
              });
            } else {
              this.setState({
                loading: false,
              });
            }
          });
      }
    }
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

  validateField = (field, updateState = false) => {
    const val = this.state.fields[field];
    let message = null;

    if (field === 'name') {
      if (val.trim().length === 0) {
        message = 'Field is requried';
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

  fieldBlurHandler = ({ target }) => {
    this.validateField(target.name, true);
  };

  valid = (field = null) => {
    let valid = true;
    let errors = {};

    ['name'].forEach((field) => {
      let error = this.validateField(field);
      if (error) {
        errors[field] = error;
        valid = false;
      }
    });

    this.setState({ errors });

    return valid;
  };

  render() {
    const {
      fields: { type, name },
      errors,
      completed,
      loading,
    } = this.state;
    const newMode = !this.props.category;

    if (completed) return <Redirect to={`/categories`} />;

    return (
      <div>
        <form className="form" onSubmit={this.submitHandler}>
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
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
            {errors['type'] && (
              <div className="input-error">{errors['type']}</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-md">{newMode ? 'Add' : 'Save'}</button>
            {loading && <CircularProgress />}
          </div>
        </form>
      </div>
    );
  }
}

const stateToProps = (state, ownProps) => {
  return {
    category: state.categories.find((c) => c._id === ownProps.id),
  };
};

const dispatchToProps = (dispatch) => ({
  create(data) {
    return dispatch(createCategory(data));
  },
  editCategory(id, data) {
    dispatch(editCategory(id, data));
  },
  addFlash(message) {
    dispatch(
      add({
        id: uuid(),
        open: true,
        message,
        hideAfter: null,
      })
    );
  },
});

export default connect(stateToProps, dispatchToProps)(CategoryForm);
