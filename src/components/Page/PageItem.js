import React from 'react';

// Utils
import classnames from 'classnames';

const PageItem = (props) => {
  const children = props.children;

  return (
    <div className={classnames('ui-page-item')}>
      {children}
    </div>
  );
};

PageItem.propTypes = {
  children: React.PropTypes.node,
};

export default PageItem;
