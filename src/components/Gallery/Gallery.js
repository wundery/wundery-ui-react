import React from 'react';
import classnames from 'classnames';
import { Progress } from '../Progress';

const Gallery = (props) => {
  const { children, progress, header: headerContent } = props;

  const progressBar = progress ? (
    <div className="ui-gallery-progress">
      <Progress progress={progress} />
    </div>
  ) : null;
  const header = headerContent ? (
    <div className="ui-gallery-header">
      {headerContent}
    </div>
  ) : null;

  return (
    <div className={classnames('ui-gallery')}>
      {header}
      {progressBar}
      {children}
    </div>
  );
};

Gallery.propTypes = {
  children: React.PropTypes.node,

  // If specified, displayed in the gallery header
  header: React.PropTypes.node,

  // If a progress is given, a progress bar component will be rendered
  // on top of the gallery (useful for uploader scenarios).
  progress: React.PropTypes.number,
};

Gallery.defaultProps = {
};

export default Gallery;
