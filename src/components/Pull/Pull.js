// React
import React from 'react';

// Utils
import classnames from 'classnames';

const Pull = props => (
  <div className={classnames('ui-pull')}>
    {props.children}
  </div>
);

Pull.propTypes = {
  children: React.PropTypes.node,
};

export default Pull;
