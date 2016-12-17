import React from 'react';

// Utils
import classnames from 'classnames';

const alignable = (Component) => {
  const AlignableComponent = (props) => {
    const align = props.align;
    if (align) {
      return (
        <Component {...props}>
          <div className={classnames(`ui-align-${align}`)}>
            {props.children}
          </div>
        </Component>
      );
    }
    return <Component {...props} />;
  };

  AlignableComponent.propTypes = {
    align: React.PropTypes.oneOf([
      'left',
      'center',
      'right',
    ]),
    children: React.PropTypes.node,
  };

  return AlignableComponent;
};

export default alignable;
