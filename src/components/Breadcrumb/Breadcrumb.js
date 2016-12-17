import React from 'react';
import classnames from 'classnames';
import { flatten } from 'lodash';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';

const Breadcrumb = (props) => {
  const { children, embedded } = props;
  const childrenArray = [].concat(children).filter(child => child !== null);
  const childrenCount = childrenArray.length;
  const childrenWithCarets = flatten(childrenArray.map((child, index) => {
    const isParent = childrenCount > 1 && index < childrenCount - 1;
    const updatedChildProps = Object.assign({}, child.props, {
      parent: isParent,
    });
    const result = [<BreadcrumbItem {...updatedChildProps} />];
    if (isParent) {
      result.push(<BreadcrumbSeparator />);
    }
    return result;
  })).map((child, index) => {
    const ChildType = child.type;
    const propsWithIndex = Object.assign({}, child.props, { key: index });
    return <ChildType {...propsWithIndex} />;
  });

  const className = classnames('ui-breadcrumb', {
    'ui-breadcrumb-embedded': embedded,
  });

  return (
    <div className={className}>
      {childrenWithCarets}
    </div>
  );
};

Breadcrumb.propTypes = {
  children: React.PropTypes.node,

  // Specifies whether the breadcrumb should appear embedded
  embedded: React.PropTypes.bool,
};

export default Breadcrumb;
