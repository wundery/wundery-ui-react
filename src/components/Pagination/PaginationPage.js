import React from 'react';

// Utils
import classnames from 'classnames';

const PaginationPage = (props) => {
  const children = props.children;

  return (
    <div className={classnames('ui-pagination-page')}>
      {children}
    </div>
  );
};

PaginationPage.propTypes = {
  children: React.PropTypes.node,
};

export default PaginationPage;
