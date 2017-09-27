import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import Button from 'material-ui/Button';
import {removeCategory, restoreCategory} from '../../actions/categories';
import {add, hide} from '../../actions/flashes';

class CategoriesList extends Component {
  render() {
    const {categories, remove} = this.props;
    return (
      <div className="categories-list">
        <ul>
          {categories.map(el => 
            <li>
              {el.name} <button onClick={() => remove(el.id)}>X</button>
            </li>
          )}
        </ul>
      </div>
    )
  }
};

const mapStateToProps = (state, {type}) => {
  return {
    categories: (type ? state.categories.filter(c => c.type === type) : state.categories).filter(el => !el.deleted)
  }
}

const dispatchToProps = dispatch => {
  return {
    remove(id) {
      dispatch(removeCategory(id))

      const flashId = uuid();
      dispatch(add({
        id: flashId,
        open: true,
        message: 'category has been deleted',
        hideAfter: 2000,
        action: (
          <Button 
            onClick={() => { 
              dispatch(restoreCategory(id));
              dispatch(hide(flashId));
            }}
            color="accent"
            raised
          >
            UNDO
          </Button>
        )
      }))
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(CategoriesList)
