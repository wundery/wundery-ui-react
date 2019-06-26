import React from 'react';
import classnames from 'classnames';
import { Spinner } from '../Spinner';
import { Progress } from '../Progress';
import { Icon } from '../Icon';

function GalleryItem(props) {
  const { addon, onClick, progress, ribbon, small, size, src, highlighted, medium } = props;

  const style = { backgroundImage: `url("${src}")` };
  const linkClassName = classnames('ui-gallery-item', {
    'ui-gallery-item-clickable': typeof onClick === 'function',
  });

  const className = classnames('ui-gallery-item-wrapper', {
    'ui-gallery-item-wrapper-size-small': small,
    'ui-gallery-item-highlighted': highlighted,
    'ui-gallery-item-wrapper-size-medium': medium
  });

  return (
    <div className={className}>
      {ribbon && <div className="ui-gallery-item-ribbon">{ribbon}</div>}

      {!src && (
        <div className="ui-gallery-item-src-missing">
          <Icon name="ban" large />
        </div>
      )}

      {src && (
        <div className={linkClassName} onClick={onClick}>

          <div className="ui-gallery-item-src-loading">
            <Spinner />
          </div>

          <div className={classnames('ui-gallery-item-src')} style={style} />

          {progress && (
            <div className="ui-gallery-item-progress">
              <Progress progress={progress} small showValue={false} />
            </div>
          )}
        </div>
      )}

      {src && addon && <div className="ui-gallery-item-addon">{addon}</div>}
    </div>
  );
}

GalleryItem.propTypes = {
  // The image src. Can be either a base64 encoded string or an URL
  src: React.PropTypes.string,

  // Specifies whether the images should appear small
  small: React.PropTypes.bool,

  // Specifies whether the images should appear medium
  medium: React.PropTypes.bool,

  // Specifies the click action on the image
  onClick: React.PropTypes.func,

  // If a progress is given, a progress bar component will be rendered
  // on top of the image (useful for uploader scenarios).
  progress: React.PropTypes.number,

  // An addon is rendered below the image, could contain actions
  addon: React.PropTypes.node,

  // A ribbon can be put on top of the item
  ribbon: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),

  // Specifies whether the item is highlighted, e.g. has a special border color
  highlighted: React.PropTypes.bool,
};

GalleryItem.defaultProps = {
  addon: null,
  highlighted: false,
  onClick: null,
  progress: null,
  ribbon: null,
  small: false,
  medium: false,
  src: null,
};

export default GalleryItem;
