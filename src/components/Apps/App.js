import React from 'react';
import classnames from 'classnames';
import { Button } from '../Button';
import AppIcon from './AppIcon';

function App(props) {
  const {
    active,
    activeLabel,
    addon,
    addButtonLabel,
    backgroundImageSrc,
    description,
    developer,
    editButtonLabel,
    height,
    imageSrc,
    onClick,
    price,
    priceLabel,
    title,
    buttons,
  } = props;

  const className = classnames('ui-app', {
    'ui-app-active': active,
    'ui-app-with-background-image': !!backgroundImageSrc,
  });

  const style = {
    height: height ? `${height}px` : null,
    backgroundImage: backgroundImageSrc && `url("${backgroundImageSrc}")`,
  };

  function renderPrice() {
    return price && (
      <div className="ui-app-price">
        {price}
        {priceLabel && <div className="ui-app-price-label">{priceLabel}</div>}
      </div>
    );
  }

  function renderDeveloper() {
    return developer && (
      <div className="ui-app-developer">
        {developer}
      </div>
    );
  }

  function renderActiveLabel() {
    return active && <div className="ui-app-active-indicator">{activeLabel}</div>;
  }

  function renderButtons() {
    if (buttons) { return buttons; }

    return (
      <div>
        {addButtonLabel && !active && (
          <div className="ui-app-add">
            <Button onClick={onClick}>{addButtonLabel}</Button>
          </div>
        )}
        {editButtonLabel && active && (
          <div className="ui-app-add">
            <Button onClick={onClick}>{editButtonLabel}</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className} onClick={onClick} style={style}>
      <div className="ui-app-meta">
        <div className="ui-app-meta-texts">
          {title && <div className="ui-app-title">{title}</div>}
          {description && <div className="ui-app-description">{description}</div>}
        </div>
        {imageSrc && (
          <div className="ui-app-meta-icon">
            <AppIcon src={imageSrc} />
          </div>
        )}
      </div>
      <div className="ui-app-footer">
        <div className="ui-app-actions">
          <div className="ui-app-buttons">
            {renderButtons()}
          </div>
          <div className="ui-app-info">
            {renderActiveLabel()}
            {renderPrice()}
          </div>
        </div>
        <div className="ui-app-author">
          {renderDeveloper()}
        </div>
      </div>
      {addon}
    </div>
  );
}

App.propTypes = {
  active: React.PropTypes.bool,
  activeLabel: React.PropTypes.string,
  addButtonLabel: React.PropTypes.string,
  description: React.PropTypes.string,
  developer: React.PropTypes.string,
  editButtonLabel: React.PropTypes.string,
  height: React.PropTypes.number,
  imageSrc: React.PropTypes.string,
  onClick: React.PropTypes.func,
  price: React.PropTypes.string,
  priceLabel: React.PropTypes.string,
  backgroundImageSrc: React.PropTypes.string,
  title: React.PropTypes.string,
  buttons: React.PropTypes.node,
  addon: React.PropTypes.node,
};

App.defaultProps = {
  activeLabel: 'Active',
};

export default App;
