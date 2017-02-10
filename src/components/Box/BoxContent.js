import React from 'react';
import classnames from 'classnames';

function BoxContent(props) {
  const {
    borderBottom,
    children,
    noPadding,
    theme,
    transparent,
  } = props;

  const className = classnames('ui-box-content', `ui-box-content-theme-${theme}`, {
    'ui-box-content-no-padding': noPadding,
    'ui-box-content-transparent': transparent,
    'ui-box-content-border-bottom': borderBottom,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
}

BoxContent.propTypes = {
  borderBottom: React.PropTypes.bool,
  children: React.PropTypes.node,
  noPadding: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['default', 'shade']).isRequired,
  transparent: React.PropTypes.bool,
};

BoxContent.defaultProps = {
  borderBottom: false,
  children: null,
  noPadding: false,
  theme: 'default',
  transparent: false,
};

export default BoxContent;
