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
    color,
    large,
    light,
    muted,
    name,
    noMargin,
    onClick,
    set,
    size,
    spin,
    theme,
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

  const classNames = classnames('ui-icon', `ui-icon-theme-${theme}`, {
    'ui-icon-color-light': light,
    'ui-icon-nomargin': noMargin,
    'ui-text-muted': muted,
  }, setClasses, sizeClasses, className);

  return <span className={classNames} onClick={onClick} style={style} />;
}

Icon.propTypes = {
  className: React.PropTypes.string,
  color: React.PropTypes.string,
  large: React.PropTypes.bool,
  light: React.PropTypes.bool,
  muted: React.PropTypes.bool,
  name: React.PropTypes.string.isRequired,
  noMargin: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  set: React.PropTypes.oneOf([FONTAWESOME4, DEVICONS]).isRequired,
  size: React.PropTypes.oneOf(['default', 'small', 'larger', 'large']),
  spin: React.PropTypes.bool,
  theme: React.PropTypes.oneOf(['default', 'success']),
};

Icon.defaultProps = {
  className: null,
  color: null,
  large: false,
  light: false,
  muted: false,
  noMargin: false,
  onClick: null,
  set: FONTAWESOME4,
  size: 'default',
  spin: false,
  theme: 'default',
};

export default tweakable(Icon);
