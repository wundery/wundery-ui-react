import React from 'react';
import classnames from 'classnames';

const Tab = props => (
  <div
    className={classnames('ui-tab', {
      'ui-tab-active': props.active,
      'ui-tab-padding': props.padding,
    })}
  >
    <div className={classnames('ui-tab-content')}>
      {props.children}
    </div>
  </div>
);

Tab.propTypes = {
  active: React.PropTypes.bool,
  padding: React.PropTypes.bool,
  children: React.PropTypes.node,
};

Tab.defaultProps = {
  disabled: false,
};

export default Tab;
