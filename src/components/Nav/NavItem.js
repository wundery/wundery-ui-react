// React
import React from 'react';

// Utils
import classnames from 'classnames';

const NavItem = props => (
  <div
    className={classnames('ui-nav-navitem', {
      'ui-nav-navitem-right': props.right,
      'ui-nav-navitem-brand': props.brand,
    })}
  >
    {props.children}
  </div>
);

NavItem.propTypes = {
  right: React.PropTypes.bool,
  brand: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default NavItem;
