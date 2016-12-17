import React from 'react';
import { Icon } from '../Icon';
import { Badge } from '../Badge';

const Hint = (props) => {
  const { children, label } = props;

  return (
    <div className="ui-hint">
      <div className="ui-hint-label">
        <Badge theme="success">
          <Icon name="lightbulb-o " /> {label}
        </Badge>
      </div>
      <div className="ui-hint-content">
        {children}
      </div>
    </div>
  );
};

Hint.propTypes = {
  children: React.PropTypes.node,
  label: React.PropTypes.string.isRequired,
};

export default Hint;
