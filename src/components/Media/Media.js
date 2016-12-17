import React from 'react';
import classnames from 'classnames';

const Media = (props) => {
  const children = props.children;

  return (
    <div className={classnames('ui-media')}>
      {children}
    </div>
  );
};

Media.propTypes = {
  children: React.PropTypes.node,
};

export default Media;
