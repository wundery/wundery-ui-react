import React from 'react';
import classnames from 'classnames';
import { isFunction } from 'lodash';
import { spacingStyles } from '../Spacing/utils';
import { Text } from '../Text';
import { Icon } from '../Icon';
import BoxContent from './BoxContent';
import BoxHeader from './BoxHeader';

function Box(props) {
  const {
    borderless,
    centeredLabel,
    children,
    content,
    embedded,
    icon,
    intro,
    label,
    margin,
    noContentPadding,
    onClick,
    padding,
    ribbon,
    theme,
  } = props;

  const style = spacingStyles({ margin, padding });

  const className = classnames(
    'ui-box', `ui-box-theme-${theme}`,
    {
      'ui-box-borderless': borderless,
      'ui-box-clickable': isFunction(onClick),
      'ui-box-embedded': embedded,
    });

  function renderRibbon() {
    if (!ribbon) { return null; }

    return (
      <div className="ui-box-ribbon-wrapper">
        <div className="ui-box-ribbon">
          {ribbon}
        </div>
      </div>
    );
  }

  return (
    <div style={style} className={className} onClick={onClick}>
      {renderRibbon()}
      {label && (
        <BoxHeader compact center={centeredLabel}>
          {icon && (<Icon name={icon} />)} {label}
        </BoxHeader>
      )}
      {content && (
        <BoxContent noPadding={noContentPadding}>
          {intro && <Text muted block margin="2xb">{intro}</Text>}
          {content}
        </BoxContent>
      )}
      {!content && children}
    </div>
  );
}

Box.propTypes = {
  borderless: React.PropTypes.bool,
  centeredLabel: React.PropTypes.bool,
  children: React.PropTypes.node,
  content: React.PropTypes.node,
  embedded: React.PropTypes.bool,
  icon: React.PropTypes.string,
  intro: React.PropTypes.node,
  label: React.PropTypes.string,
  margin: React.PropTypes.string,
  noContentPadding: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  padding: React.PropTypes.string,
  ribbon: React.PropTypes.node,
  theme: React.PropTypes.oneOf(['default', 'highlight', 'error', 'info']).isRequired,
};

Box.defaultProps = {
  theme: 'default',
  embedded: false,
};

export default Box;
