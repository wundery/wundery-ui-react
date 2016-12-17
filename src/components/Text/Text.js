import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';

function Text({ margin, padding, children, block, small, bold, muted, center }) {
  const style = spacingStyles({ margin, padding });
  const classNames = classnames('ui-text', {
    'ui-text-muted': muted,
    'ui-text-bold': bold,
    'ui-text-small': small,
    'ui-align-center': center,
  });

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
};

export default Text;
