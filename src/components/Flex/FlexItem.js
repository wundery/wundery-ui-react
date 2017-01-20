import React from 'react';
import classnames from 'classnames';
import { map } from 'lodash';

const FlexItem = ({ children, widths, width, borderRight, borderLeft, grow, noShrink }) => {
  const style = {};

  const widthClassNames = map(
    widths,
    (_width, media) => `ui-flexgrid-item-width-${media}-${_width}`
  );

  if (width) {
    style.width = `${width}px`;
  }

  const className = classnames('ui-flexgrid-item', widthClassNames, {
    'ui-flexgrid-item-border-left': borderLeft,
    'ui-flexgrid-item-border-right': borderRight,
    'ui-flexgrid-item-grow': grow,
    'ui-flexgrid-item-no-shrink': noShrink,
  });

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

FlexItem.propTypes = {
  children: React.PropTypes.node,

  /**
   * Specifies the media-widths
   * @type {Object}
   */
  widths: React.PropTypes.object,

  /**
   * Specifies whether the box should grow
   * @type {Boolean}
   */
  grow: React.PropTypes.bool,

  /**
   * Specifies whether the box should not shrink
   * @type {Boolean}
   */
  noShrink: React.PropTypes.bool,

  /**
   * If specified, the item has a fixed pixel-width
   * @type {Integer}
   */
  width: React.PropTypes.number,

  /**
   * Specifies whether a right border class should be added
   * @type {Boolean}
   */
  borderRight: React.PropTypes.bool,

  /**
   * Specifies whether a left border class should be added
   * @type {Boolean}
   */
  borderLeft: React.PropTypes.bool,
};

FlexItem.defaultProps = {
  children: null,
  widths: null,
  width: null,
  grow: false,
  noShrink: false,
  borderRight: false,
  borderLeft: false,
};

export default FlexItem;
