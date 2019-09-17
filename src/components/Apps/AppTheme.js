import React from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

function AppTheme(props) {
  const {
    browseButtonLabel,
    description,
    onClick,
    title,
    icon,
    palette,
    color,
    height,
  } = props;

  const style = {
    fill: color ? color : null,
  };

  const styleSVG = {
    height: height ? `${height}px` : null,
  };

  function renderButtons() {
    return (
      <div>
        {browseButtonLabel && (<div className="ui-app-add">
          <Button onClick={onClick}>{browseButtonLabel}</Button>
        </div>)}
      </div>
    );
  }

  function renderIconPalette() {
    return (
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" className="svg-inline--fa fa-palette fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={styleSVG} id="svg-palette"><path id="ui-app-palette" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" style={style}></path></svg>
    )
  }

  return (
    <div className="ui-app" onClick={onClick}>
        <div className="ui-app-meta">

          <div className="ui-app-meta-icon">
            {!palette && (<Icon name={icon} theme={'store'}/>)}
            {palette && renderIconPalette()}
          </div>

          <div className="ui-app-meta-texts ui-app-meta-texts-margin">
            {title && <div className="ui-app-title">{title}</div>}
            {description && <div className="ui-app-description">{description}</div>}
          </div>
          <div className="ui-app-actions ui-app-actions-margin">
            <div className="ui-app-buttons">
              {renderButtons()}
            </div>
          </div>
        </div>
      </div>
  )
}

AppTheme.propTypes = {
  browseButtonLabel: React.PropTypes.string,
  description: React.PropTypes.string,
  title: React.PropTypes.string,
  onClick: React.PropTypes.func,
  icon: React.PropTypes.string,
  palette: React.PropTypes.bool,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
};

AppTheme.defaultProps = {
  palette: false,
};

export default AppTheme;
