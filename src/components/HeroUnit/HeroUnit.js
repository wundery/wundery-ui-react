import React from 'react';
import { Icon } from '../Icon';
import { spacable } from '../../hocs';

function HeroUnit(props) {
  const {
    children,
    icon,
    iconTheme,
    style,
    title,
  } = props;

  return (
    <div className="ui-hero-unit" style={style}>
      <div className="ui-hero-unit-header">
        {icon && (
          <div className="ui-hero-unit-icon">
            <Icon name={icon} theme={iconTheme} />
          </div>
        )}
        <div className="ui-hero-unit-title">
          {title}
        </div>
      </div>
      <div className="ui-hero-unit-content">
        {children}
      </div>
    </div>
  );
}

HeroUnit.propTypes = {
  children: React.PropTypes.node,
  icon: React.PropTypes.string,
  iconTheme: React.PropTypes.string,
  style: React.PropTypes.object,
  title: React.PropTypes.string.isRequired,
};

HeroUnit.defaultProps = {
  children: null,
  icon: null,
  iconTheme: null,
  style: null,
};

export default spacable(HeroUnit);
