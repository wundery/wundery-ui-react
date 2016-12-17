import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Spinner } from '../Spinner';

function Badge({ children, margin, padding, state, tooltip, icon, theme, loading }) {
  const style = spacingStyles({ margin, padding });
  const className = classnames('ui-badge', `ui-badge-${theme || state}`);

  function renderChildrenWithIcon() {
    if (icon) {
      return <span><Icon name={icon} noMargin /> {children}</span>;
    }

    return <span><Spinner /> {children}</span>;
  }

  const badge = (
    <span style={style} className={className}>
      {(icon || loading)
        ? renderChildrenWithIcon()
        : children}
    </span>
  );

  return tooltip
    ? <Tooltip content={tooltip}>{badge}</Tooltip>
    : badge;
}

Badge.propTypes = {
  state: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  icon: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]),
  tooltip: React.PropTypes.node,
  margin: React.PropTypes.string,
  padding: React.PropTypes.string,
  theme: React.PropTypes.oneOf(['success', 'danger', 'default', 'info']).isRequired,
  loading: React.PropTypes.bool,
};

Badge.defaultProps = {
  state: 'default',
  theme: 'default',
};

export default Badge;
