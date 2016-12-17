import React from 'react';
import classnames from 'classnames';

const BreadcrumbItem = (props) => {
  const { parent, active, label, link: linkBuilder } = props;
  const className = classnames('ui-breadcrumb-item', {
    'ui-breadcrumb-item-active': active,
    'ui-breadcrumb-item-parent': parent,
  });
  const content = linkBuilder ? linkBuilder(label) : label;

  return (
    <div className={className}>
      {content}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  // Defines whether this crumb is active
  active: React.PropTypes.bool,

  // Defines the displayed text
  label: React.PropTypes.string.isRequired,

  // Defines whether this item is a parent item (and should then be styled
  // differently)
  parent: React.PropTypes.bool,

  // If specified, this is called to build a link inside the item
  link: React.PropTypes.func,
};

export default BreadcrumbItem;
