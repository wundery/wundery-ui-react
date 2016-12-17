import React from 'react';

// Utils
import classnames from 'classnames';

const GalleryItems = props => (
  <div className={classnames('ui-gallery-items')}>
    {props.children}
  </div>
);

GalleryItems.propTypes = {
  children: React.PropTypes.node,
};

export default GalleryItems;
