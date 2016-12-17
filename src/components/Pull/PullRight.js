// React
import React from 'react';

// Utils
import classnames from 'classnames';

const PullRight = props => (
  <div className={classnames('ui-pull-right')}>
    {props.children}
  </div>
);

PullRight.propTypes = {
  children: React.PropTypes.node,
};

export default PullRight;
