import React from 'react';
import { Icon } from '../Icon';
import { Badge } from '../Badge';

const Hint = ({ children, label, icon }) => (
  <div className="ui-hint">
    <div className="ui-hint-label">
      <Badge theme="success">
        {icon && <Icon name={icon} />} {label}
      </Badge>
    </div>
    <div className="ui-hint-content">
      {children}
    </div>
  </div>
);

Hint.propTypes = {
  children: React.PropTypes.node,
  label: React.PropTypes.string.isRequired,
  icon: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
};

Hint.defaultProps = {
  icon: 'lightbulb-o',
};

export default Hint;
