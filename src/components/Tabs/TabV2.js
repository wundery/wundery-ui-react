import React from 'react';
import classnames from 'classnames';

function Tab({ active, padding, children }) {
  const className = classnames('ui-tab', {
    'ui-tab-active': active,
    'ui-tab-padding': padding,
  });

  return (
    <div className={className}>
      <div className={classnames('ui-tab-content')}>
        {children}
      </div>
    </div>
  );
}

Tab.propTypes = {
  active: React.PropTypes.bool,
  padding: React.PropTypes.bool,

  // eslint-disable-next-line react/no-unused-prop-types
  builder: React.PropTypes.func,
  children: React.PropTypes.node,
};

Tab.defaultProps = {
  disabled: false,
};

export default Tab;
