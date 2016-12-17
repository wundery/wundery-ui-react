import React from 'react';
import classnames from 'classnames';

const Filters = props => (
  <div className={classnames('ui-filters')}>
    {props.children}
  </div>
);

Filters.propTypes = {
  children: React.PropTypes.node,
};

export default Filters;
