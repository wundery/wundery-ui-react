import React from 'react';
import { Badge } from '../Badge';

function StatusBadge({ value, trueLabel, falseLabel, showLabel }) {
  const iconName = value ? 'check' : 'ban';
  const theme = value ? 'success' : 'info';
  const label = value ? trueLabel : falseLabel;

  return (
    <Badge icon={!showLabel && iconName} tooltip={!showLabel && label} theme={theme}>
      {showLabel && label}
    </Badge>
  );
}

StatusBadge.propTypes = {
  value: React.PropTypes.bool.isRequired,
  trueLabel: React.PropTypes.string.isRequired,
  falseLabel: React.PropTypes.string.isRequired,
  showLabel: React.PropTypes.bool.isRequired,
};

StatusBadge.defaultProps = {
  value: true,
  showLabel: false,
};

export default StatusBadge;
