import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControlLabel } from '@material-ui/core';

import CategoriesList from '../CategoriesList';
import CategoryForm from './CategoryForm';

import './style.css';

class Categories extends Component {
  state = {
    categoryType: 'income',
  };

  handleChange = (event, value) => {
    this.setState({ categoryType: value });
  };

  render() {
    return (
      <div>
        <div className="categories">
          <Switch>
            <Route
              exact
              path="/categories"
              component={() => (
                <div>
                  <RadioGroup
                    value={this.state.categoryType}
                    onChange={this.handleChange}
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
                  <CategoriesList type={this.state.categoryType} />
                  <Link to="/categories/add" className="btn">
                    Add A Category
                  </Link>
                </div>
              )}
            />

            <Route exact path="/categories/add" component={CategoryForm} />
            <Route
              exact
              path="/categories/:id"
              component={({ match }) => <CategoryForm id={match.params.id} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Categories;
