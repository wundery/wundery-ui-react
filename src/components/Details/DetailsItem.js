import React from 'react';
import classnames from 'classnames';

function DetailsItem({ grow, label, value }) {
  return (
    <div className={classnames('ui-details-item', { 'ui-details-item-grow': grow })}>
      <div className={classnames('ui-details-item-label')}>
        {label}
      </div>
      <div className={classnames('ui-details-item-value')}>
        {value}
      </div>
    </div>
  );
}

DetailsItem.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.node,
  grow: React.PropTypes.bool,
};

export default DetailsItem;
