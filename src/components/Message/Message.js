import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';
import { Icon } from '../Icon';

function Message({ theme, children, icon, margin }) {
  const style = spacingStyles({ margin });

  const className = classnames('ui-message', `ui-message-theme-${theme}`);

  return (
    <div style={style} className={className}>
      {icon && (
        <div className="ui-message-icon">
          <Icon name={icon} />
        </div>
      )}
      <div className="ui-message-content">
        {children}
      </div>
    </div>
  );
}

Message.propTypes = {
  icon: React.PropTypes.string,
  margin: React.PropTypes.string,
  children: React.PropTypes.node,
  theme: React.PropTypes.oneOf(['default', 'success', 'error']).isRequired,
};

Message.defaultProps = {
  theme: 'default',
};

export default Message;
