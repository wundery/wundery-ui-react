import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon';

function Spinner({ large, muted }) {
  if (large) {
    return (
      <div className={classnames('ui-spinner', 'ui-spinner-large')}>
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    );
  }

  return (
    <span className={classnames('ui-spinner')}>
      <Icon name="circle-o-notch" spin muted={muted} />
    </span>
  );
}

Spinner.propTypes = {
  // Renders another, larger type of spinner
  large: React.PropTypes.bool,
  muted: React.PropTypes.bool,
};

export default Spinner;
