import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';

import { hide, remove } from '../../actions/flashes';

const FlashMessages = ({ flashes, removeFlash, hideFlash }) => (
  <div>
    {flashes.map(
      ({
        id,
        message,
        open,
        hideAfter = 3000,
        vertical = 'top',
        horizontal = 'right',
        action = null,
      }) => (
        <Snackbar
          key={id}
          anchorOrigin={{
            vertical,
            horizontal,
          }}
          autoHideDuration={hideAfter}
          open={open}
          onRequestClose={(event, reason) => {
            hideFlash(id);
          }}
          onExited={() => {
            removeFlash(id);
          }}
          message={<span>{message}</span>}
          action={action}
        />
      )
    )}
  </div>
);

const stateToProps = (state) => ({
  flashes: state.flashes,
});

const dispatchToProps = (dispatch) => ({
  removeFlash(id) {
    dispatch(remove(id));
  },
  hideFlash(id) {
    dispatch(hide(id));
  },
});

export default connect(stateToProps, dispatchToProps)(FlashMessages);
