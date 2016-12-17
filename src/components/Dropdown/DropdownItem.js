import React from 'react';
import classnames from 'classnames';
import { isString } from 'lodash';
import { Icon } from '../Icon';

function DropdownItem(props) {
  const { title, focussed, onClick, icon, image, description, body } = props;

  const className = classnames('ui-dropdown-item', {
    'ui-dropdown-item-focussed': focussed,
  });

  return (
    <div className={className} onClick={onClick}>
      {icon && (
        <div className={classnames('ui-dropdown-item-icon')}>
          {isString(icon) && <Icon name={icon} />}
          {!isString(icon) && <Icon name={icon.name} set={icon.set} color={icon.color} />}
        </div>
      )}
      {image && (
        <div className={classnames('ui-dropdown-item-image')}>
          {image}
        </div>
      )}
      <div className={classnames('ui-dropdown-item-content')}>
        {title && (
          <div className={classnames('ui-dropdown-item-title')}>
            {title}
          </div>
        )}
        {description && (
          <div className={classnames('ui-dropdown-item-description')}>
            {description}
          </div>
        )}
        {body && (
          <div className={classnames('ui-dropdown-item-body')}>
            {body}
          </div>
        )}
      </div>
    </div>
  );
}

DropdownItem.propTypes = {
  title: React.PropTypes.node,
  description: React.PropTypes.string,
  body: React.PropTypes.object,
  icon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
  onClick: React.PropTypes.func.isRequired,
  image: React.PropTypes.node,
  focussed: React.PropTypes.bool,
};

DropdownItem.defaultProps = {
  onClick: () => {},
};

export default DropdownItem;
