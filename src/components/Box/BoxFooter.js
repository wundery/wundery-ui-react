import React from 'react';

// Utils
import classnames from 'classnames';

const BoxFooter = props => (
  <div className={classnames('ui-box-footer')}>
    {props.children}
  </div>
);

BoxFooter.propTypes = {
  children: React.PropTypes.node,
};

BoxFooter.defaultProps = {
};

export default BoxFooter;
