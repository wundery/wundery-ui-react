import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';
import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { Spinner } from '../Spinner';

function Badge(props) {
  const {
    children,
    icon,
    label,
    loading,
    margin,
    padding,
    small,
    theme,
    tooltip,
  } = props;

  const style = spacingStyles({ margin, padding });

  const size = small ? 'small' : 'default';
  const className = classnames(
    'ui-badge',
    `ui-badge-theme-${theme}`,
    `ui-badge-size-${size}`,
  );

  function renderChildrenWithIcon() {
    if (icon) {
      return <span><Icon name={icon} noMargin /> {children}</span>;
    }

    return <span><Spinner /> {children}</span>;
  }

  const badge = (
    <span style={style} className={className}>
      {label && <span className="ui-badge-label">{label}</span>}
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
  children: React.PropTypes.node,
  icon: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
  label: React.PropTypes.string,
  loading: React.PropTypes.bool,
  margin: React.PropTypes.string,
  padding: React.PropTypes.string,
  small: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['success', 'danger', 'default', 'info', 'light']).isRequired,
  tooltip: React.PropTypes.node,
};

Badge.defaultProps = {
  theme: 'default',
};

export default Badge;
