import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function Text(props) {
  const {
    block,
    bold,
    center,
    children,
    margin,
    muted,
    padding,
    small,
    theme,
    left,
    right,
    italic,
    large
  } = props;

  const style = spacingStyles({ margin, padding });
  const classNames = classnames('ui-text', `ui-text-theme-${theme}`, {
    'ui-text-muted': muted,
    'ui-text-bold': bold,
    'ui-text-small': small,
    'ui-align-center': center,
    'ui-align-left': left,
    'ui-align-right': right,
    'ui-text-font-italic': italic,
    'ui-text-large': large,
  });

  if (left) {
    classNames.push('ui-align-left');
  }

  if (right) {
    classNames.push('ui-align-right');
  }

  if (italic) {
    classNames.push('ui-text-font-italic')
  }

  return block
    ? <div className={classNames} style={style}>{children}</div>
    : <span className={classNames} style={style}>{children}</span>;
}

Text.propTypes = {
  muted: React.PropTypes.bool,
  block: React.PropTypes.bool,
  children: React.PropTypes.node,
  bold: React.PropTypes.bool,
  margin: React.PropTypes.string,
  padding: React.PropTypes.string,
  small: React.PropTypes.bool,
  center: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['default', 'success', 'light']),
  left: React.PropTypes.bool,
  right: React.PropTypes.bool,
  italic: React.PropTypes.bool,
  large: React.PropTypes.bool,
};

Text.defaultProps = {
  theme: 'default',
};

export default Text;
