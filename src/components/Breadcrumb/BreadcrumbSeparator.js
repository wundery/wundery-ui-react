import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon';

const BreadcrumbSeparator = () => {
  const className = classnames('ui-breadcrumb-separator');

  return (
    <div className={className}>
      <Icon name="caret-right" noMargin />
    </div>
  );
};

export default BreadcrumbSeparator;
