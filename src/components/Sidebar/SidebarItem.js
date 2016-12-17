import React from 'react';

// Utils
import classnames from 'classnames';

const SidebarItem = props => (
  <div
    className={classnames('ui-sidebar-item', {
      'ui-sidebar-item-active': props.active,
    })}
  >
    {props.children}
  </div>
);

SidebarItem.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default SidebarItem;
