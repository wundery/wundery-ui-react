import React from 'react';
import classnames from 'classnames';

function ListItem({ children, onClick, active }) {
  const className = classnames('ui-list-item', {
    'ui-list-item-with-onclick': !!onClick,
    'ui-list-item-active': active,
  });

  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
}

ListItem.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  active: React.PropTypes.bool,
};

export default ListItem;
