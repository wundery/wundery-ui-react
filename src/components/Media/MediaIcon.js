import React from 'react';
import classnames from 'classnames';

const MediaIcon = (props) => {
  const children = props.children;

  return (
    <div className={classnames('ui-media-icon')}>
      {children}
    </div>
  );
};

MediaIcon.propTypes = {
  children: React.PropTypes.node,
};

export default MediaIcon;
