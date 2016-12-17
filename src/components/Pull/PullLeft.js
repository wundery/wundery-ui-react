// React
import React from 'react';

// Utils
import classnames from 'classnames';

const PullLeft = props => (
  <div className={classnames('ui-pull-left')}>
    {props.children}
  </div>
);

PullLeft.propTypes = {
  children: React.PropTypes.node,
};

export default PullLeft;
