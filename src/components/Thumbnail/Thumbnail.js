import React from 'react';
import classnames from 'classnames';

function Thumbnail({ src, label, circle }) {
  const className = classnames('ui-thumbnail', {
    'ui-thumbnail-circle': circle,
  });

  return (
    <div className={className}>
      {label && <div className="ui-thumbnail-label">{label}</div>}
      <img src={src} role="presentation" />
    </div>
  );
}

Thumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  circle: React.PropTypes.bool,
};

export default Thumbnail;
