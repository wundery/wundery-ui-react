import React from 'react';

const Tooltip = props => (
  <span className="ui-tooltip">
    <span className="ui-tooltip-content">
      {props.content}
    </span>
    {props.children}
  </span>
);

Tooltip.propTypes = {
  children: React.PropTypes.any,
  content: React.PropTypes.node,
};

Tooltip.defaultProps = {
  position: 'bottom',
};

export default Tooltip;
