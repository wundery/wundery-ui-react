import React from 'react';
import classnames from 'classnames';

function Nav({ inverse, children, fixed, prefix }) {
  const className = classnames('ui-nav', {
    'ui-nav-fixed': fixed,
    'ui-nav-inverse': inverse,
  });

  return (
    <div className={className}>
      {prefix && <div className="ui-nav-prefix">{prefix}</div>}
      <div className={classnames('ui-nav-navitems')}>
        {children}
      </div>
    </div>
  );
}

Nav.propTypes = {
  fixed: React.PropTypes.bool.isRequired,
  inverse: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node,
  prefix: React.PropTypes.node,
};


Nav.defaultProps = {
  fixed: false,
  inverse: false,
  prefix: null,
  children: null,
};

export default Nav;
