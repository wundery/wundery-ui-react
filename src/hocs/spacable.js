import React from 'react';
import { spacingStyles } from '../components/Spacing/utils';

function spacable(Component) {
  const SpacableComponent = ({ margin, padding, ...rest }) => {
    const style = spacingStyles({ margin, padding });
    const newProps = { ...rest, style };

    return <Component {...newProps} />;
  };

  SpacableComponent.propTypes = {
    margin: React.PropTypes.string,
    padding: React.PropTypes.string,
  };

  SpacableComponent.defaultProps = {
    margin: null,
    padding: null,
  };

  return SpacableComponent;
}

export default spacable;
