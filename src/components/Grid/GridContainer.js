import React from 'react';

// Utils
import classnames from 'classnames';

const GridContainer = (props) => {
  const children = props.children;
  const fluid = props.fluid;

  return (
    <div
      className={classnames({
        container: !fluid,
        'container-fluid': fluid,
      })}
    >
      {children}
    </div>
  );
};

GridContainer.propTypes = {
  fluid: React.PropTypes.bool,
  children: React.PropTypes.node,
};

GridContainer.defaultProps = {
  fluid: false,
};

export default GridContainer;
