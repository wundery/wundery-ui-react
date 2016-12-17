import React from 'react';
import classnames from 'classnames';
import { tweakable } from '../../decorators';

const FONTAWESOME4 = 'fontawesome4';
const DEVICONS = 'devicons';
const COLORS = {
  sass: '#CD669A',
  css3: '#007DC5',
  html5: '#F05B31',
  javascript: '#F8DC3D',
};

function Icon(props) {
  const {
    className,
    spin,
    light,
    large,
    size,
    noMargin,
    onClick,
    name,
    set,
    color,
    muted,
  } = props;

  const setClasses = [];
  const sizeClasses = [];
  const style = {};

  if (set === FONTAWESOME4) {
    setClasses.push('fa');
    setClasses.push('fa-fw');
    setClasses.push(`fa-${name}`);
    if (spin) { setClasses.push('fa-spin'); }
  }

  if (set === DEVICONS) {
    setClasses.push('devicons');
    setClasses.push(`devicons-${name}`);
  }

  if (color) {
    style.color = COLORS[color] || color;
  }

  if (size && !large) {
    sizeClasses.push(`ui-icon-size-${size}`);
  }

  if (large) {
    sizeClasses.push('ui-icon-size-large');
  }

  const classNames = classnames('ui-icon', {
    'ui-icon-color-light': light,
    'ui-icon-nomargin': noMargin,
    'ui-text-muted': muted,
  }, setClasses, sizeClasses, className);

  return <span className={classNames} onClick={onClick} style={style} />;
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  spin: React.PropTypes.bool,
  large: React.PropTypes.bool,
  muted: React.PropTypes.bool,
  light: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  noMargin: React.PropTypes.bool,
  className: React.PropTypes.string,
  color: React.PropTypes.string,
  set: React.PropTypes.oneOf([FONTAWESOME4, DEVICONS]).isRequired,
  size: React.PropTypes.oneOf(['default', 'small', 'larger', 'large']),
};

Icon.defaultProps = {
  set: FONTAWESOME4,
};

export default tweakable(Icon);
