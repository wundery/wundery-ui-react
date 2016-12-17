import React from 'react';
import classnames from 'classnames';

const BoxHeaderDescription = (props) => {
  const children = props.children;
  const content = props.content;

  return (
    <div className={classnames('ui-box-header-description')}>
      {children || content}
    </div>
  );
};

BoxHeaderDescription.propTypes = {
  children: React.PropTypes.node,
  content: React.PropTypes.node,
};

export default BoxHeaderDescription;
