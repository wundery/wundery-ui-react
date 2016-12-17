import React from 'react';

function FlexItemOverlay({ children }) {
  return <div className="ui-flexgrid-item-overlay">{children}</div>;
}

FlexItemOverlay.propTypes = {
  children: React.PropTypes.node,
};

export default FlexItemOverlay;
