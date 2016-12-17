import React from 'react';

// Utils
import classnames from 'classnames';

const GridCol = (props) => {
  const classes = [];
  const { center } = props;

  if (props.borders) {
    if (props.borders.match(/l/)) {
      classes.push('ui-grid-col-border-left');
    }
    if (props.borders.match(/r/)) {
      classes.push('ui-grid-col-border-right');
    }
  }

  if (typeof props.width === 'number') {
    classes.push(`col-md-${props.width}`);
  } else if (typeof props.width === 'object') {
    Object.keys(props.width).forEach((key) => {
      classes.push(`col-${key}-${props.width[key]}`);
    });
  }

  if (typeof props.offset === 'number') {
    classes.push(`col-md-offset-${props.offset}`);
  } else if (typeof props.offset === 'object') {
    Object.keys(props.offset).forEach((key) => {
      classes.push(`col-${key}-offset-${props.offset[key]}`);
    });
  }

  if (center) {
    classes.push('col-align-center');
  }

  return (
    <div className={classnames(classes)}>
      {props.children}
    </div>
  );
};

GridCol.propTypes = {
  // width and offset can either be passed in as number, e.g.
  // width={4} or as object with device identifiers as keys, e.g.
  // width={{ md: 4, sm: 12 }}.
  width: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object,
  ]).isRequired,
  offset: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.object,
  ]),
  children: React.PropTypes.node,
  borders: React.PropTypes.string,

  /**
   * Centers the content
   * @type {Boolean}
   */
  center: React.PropTypes.bool,
};

GridCol.defaultProps = {
  width: 12,
};

export default GridCol;
