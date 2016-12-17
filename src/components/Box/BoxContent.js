import React from 'react';
import classnames from 'classnames';

function BoxContent({ noPadding, transparent, borderBottom, children }) {
  return (
    <div
      className={classnames('ui-box-content', {
        'ui-box-content-no-padding': noPadding,
        'ui-box-content-transparent': transparent,
        'ui-box-content-border-bottom': borderBottom,
      })}
    >
      {children}
    </div>
  );
}

BoxContent.propTypes = {
  children: React.PropTypes.node,
  transparent: React.PropTypes.bool,
  noPadding: React.PropTypes.bool,
  borderBottom: React.PropTypes.bool,
};

export default BoxContent;
