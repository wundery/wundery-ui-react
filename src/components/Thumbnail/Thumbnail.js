import React from 'react';
import classnames from 'classnames';

function Thumbnail({ src, label, circle, width }) {
  const className = classnames('ui-thumbnail', {
    'ui-thumbnail-circle': circle,
  });

  const style = {};

  if (width) {
    style.width = `${width}px`;
  }

  return (
    <div className={className}>
      {label && <div className="ui-thumbnail-label">{label}</div>}
      <img src={src} role="presentation" style={style} />
    </div>
  );
}

Thumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  circle: React.PropTypes.bool,
  width: React.PropTypes.number,
};

export default Thumbnail;
