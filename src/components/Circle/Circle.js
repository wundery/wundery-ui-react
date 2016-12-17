import React from 'react';
import classnames from 'classnames';

function Circle({ theme }) {
  return (
    <span className={classnames('ui-circle', `ui-circle-theme-${theme}`)} />
  );
}

Circle.propTypes = {
  theme: React.PropTypes.string.isRequired,
};

Circle.defaultProps = {
  theme: 'default',
};

export default Circle;
