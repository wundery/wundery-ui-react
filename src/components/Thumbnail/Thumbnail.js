import React from 'react';
import classnames from 'classnames';

function Thumbnail({ src, label, circle, inline, width }) {
  const className = classnames('ui-thumbnail', {
    'ui-thumbnail-circle': circle,
    'ui-thumbnail-inline': inline,
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
  circle: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  label: React.PropTypes.string,
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
};

export default Thumbnail;
