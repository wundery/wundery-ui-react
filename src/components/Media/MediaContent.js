import React from 'react';
import classnames from 'classnames';

const MediaContent = (props) => {
  const children = props.children;

  return (
    <div className={classnames('ui-media-content')}>
      {children}
    </div>
  );
};

MediaContent.propTypes = {
  children: React.PropTypes.node,
};

export default MediaContent;
