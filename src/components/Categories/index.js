import React, {Component} from 'react';

import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import CategoriesList from '../CategoriesList';

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
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={this.state.categoryType}
            onChange={this.handleChange}
            row
          >
            <FormControlLabel value="income" control={<Radio />} label="Income" />
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
          <CategoriesList type={this.state.categoryType} />
        </div>
      </div>
    );
  }
}

export default Categories;