import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';

import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import CategoriesList from '../CategoriesList';
import CategoryForm from './CategoryForm';

class Categories extends Component {
  state = {
    categoryType: 'income',
  };

  handleChange = (event, value) => {
    this.setState({ categoryType: value });
  };

  render(){
    return (
      <div>
        <div className="categories">
          <Switch>
            <Route 
              exact path="/categories"
              component={() => (
                <div>
                  <RadioGroup
                    value={this.state.categoryType}
                    onChange={this.handleChange}
                    row
                  >
                    <FormControlLabel value="income" control={<Radio />} label="Income" />
                    <FormControlLabel value="expense" control={<Radio />} label="Expense" />
                  </RadioGroup>
                  <CategoriesList type={this.state.categoryType} />
                  <Link to="/categories/add" className="btn">Add A Category</Link>
                </div>
              )}
            />
            
          <Route exact path="/categories/add" component={CategoryForm}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Categories;