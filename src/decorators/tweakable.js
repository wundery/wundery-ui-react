import React from 'react';

// Utils
import classnames from 'classnames';

const tweakable = (Component) => {
  const TweakableComponent = (props) => {
    let result = <Component {...props} />;

    if (props.center) {
      result = (
        <div className={classnames('ui-align-center')}>
          {result}
        </div>
      );
    }

    return result;
  };

  TweakableComponent.propTypes = {
    // wraps the component into an alignment wrapper
    center: React.PropTypes.bool,
  };

  return TweakableComponent;
};

export default tweakable;
