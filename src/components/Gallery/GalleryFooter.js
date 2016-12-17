import React from 'react';

// Utils
import classnames from 'classnames';

const GalleryFooter = props => (
  <div className={classnames('ui-gallery-footer')}>
    {props.children}
  </div>
);

GalleryFooter.propTypes = {
  children: React.PropTypes.node,
};

export default GalleryFooter;
