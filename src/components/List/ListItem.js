import React from 'react';
import classnames from 'classnames';
import { Media, MediaContent, MediaIcon } from '../Media';
import { Thumbnail } from '../Thumbnail';

function ListItem(props) {
  const {
    active,
    children,
    compact,
    imageSrc,
    imageWidth,
    onClick,
  } = props;

  const className = classnames('ui-list-item', {
    'ui-list-item-with-onclick': !!onClick,
    'ui-list-item-active': active,
    'ui-list-item-compact': compact,
  });

  function renderContent() {
    if (imageSrc) {
      return (
        <Media compact={compact}>
          <MediaIcon>
            <Thumbnail src={imageSrc} width={imageWidth} />
          </MediaIcon>
          <MediaContent>
            {children}
          </MediaContent>
        </Media>
      );
    }

    return children;
  }

  return (
    <div className={className} onClick={onClick}>
      {renderContent()}
    </div>
  );
}

ListItem.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  active: React.PropTypes.bool,

  // Renders a compact mode
  compact: React.PropTypes.bool,

  // If an image is provided it is inserted as media icon
  imageSrc: React.PropTypes.string,

  // Image with in pixel
  imageWidth: React.PropTypes.number,
};

ListItem.defaultProps = {
  active: false,
  children: null,
  compact: false,
  imageSrc: null,
  imageWidth: 40,
  onClick: null,
};

export default ListItem;
