import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { removeCategory, restoreCategory } from '../../actions/categories';
import { add, hide } from '../../actions/flashes';

import './style.css';

class CategoriesList extends Component {
  render() {
    const { categories, remove } = this.props;
    return (
      <div className="categories-list">
        <ul>
          {categories.map((el) => (
            <li className="categories--item" key={el._id}>
              <span className="categories--item-name">{el.name}</span>
              <div className="category-actions">
                <button className="action-button">
                  <Link to={`categories/${el._id}`}>Edit</Link>
                </button>
                <button
                  className="action-button"
                  onClick={() => remove(el._id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, { type }) => {
  return {
    categories: (type
      ? state.categories.filter((c) => c.type === type)
      : state.categories
    ).filter((el) => !el.deleted),
  };
};

const dispatchToProps = (dispatch) => {
  return {
    remove(id) {
      dispatch(removeCategory(id));

      const flashId = uuid();
      dispatch(
        add({
          id: flashId,
          open: true,
          message: 'category has been deleted',
          hideAfter: 2000,
          action: (
            <button
              onClick={() => {
                dispatch(restoreCategory(id));
                dispatch(hide(flashId));
              }}
            >
              UNDO
            </button>
          ),
        })
      );
    },
  };
};

export default connect(mapStateToProps, dispatchToProps)(CategoriesList);
