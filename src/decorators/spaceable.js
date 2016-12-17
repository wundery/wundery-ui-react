import React from 'react';
import { Spacing } from '../components/Spacing';

const spaceable = (Component) => {
  const SpaceableComponent = (props) => {
    const padding = props.padding;
    const margin = props.margin;

    if (margin || padding) {
      let intermediate = <Component {...props} />;

      if (padding) {
        intermediate = (
          <Component {...props}>
            <Spacing padding={padding}>
              {props.children}
            </Spacing>
          </Component>
        );
      }

      if (margin) {
        intermediate = (
          <Spacing margin={margin}>
            {intermediate}
          </Spacing>
        );
      }

      return intermediate;
    }

    return <Component {...props} />;
  };

  SpaceableComponent.propTypes = {
    padding: React.PropTypes.string,
    margin: React.PropTypes.string,
    children: React.PropTypes.node,
  };

  return SpaceableComponent;
};

export default spaceable;
