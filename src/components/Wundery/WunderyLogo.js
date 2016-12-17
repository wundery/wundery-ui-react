// React
import React from 'react';

// Utils
import classnames from 'classnames';

const WunderyLogo = props => (
  <div
    className={classnames('ui-wundery-logo', {
      'ui-wundery-ui-logo-size-small': props.small,
      'ui-wundery-ui-logo-size-tiny': props.tiny,
    })}
  />
);

WunderyLogo.propTypes = {
  small: React.PropTypes.bool,
  tiny: React.PropTypes.bool,
};

WunderyLogo.defaultProps = {
  children: React.PropTypes.node,
};

export default WunderyLogo;
