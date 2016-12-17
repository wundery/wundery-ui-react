import React from 'react';

// Utils
import classnames from 'classnames';

const muteable = (Component) => {
  const MuteableComponent = (props) => {
    const classes = classnames({
      'ui-text-muted': props.muted,
      'ui-text-inverse': props.inverse,
      'ui-text-light': props.light,
      'ui-text-opaque': props.opaque,
      'ui-text-large': props.large,
    });

    if (props.muted || props.inverse || props.large || props.opaque) {
      return (
        <Component {...props}>
          <div className={classes}>
            {props.children}
          </div>
        </Component>
      );
    }
    return <Component {...props} />;
  };

  MuteableComponent.propTypes = {
    muted: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    light: React.PropTypes.bool,
    large: React.PropTypes.bool,
    opaque: React.PropTypes.bool,
    children: React.PropTypes.node,
  };

  return MuteableComponent;
};

export default muteable;
