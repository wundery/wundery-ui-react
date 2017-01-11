import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';
import { Button } from '../Button';

function ButtonGroup({ loose, children, margin, block, disabled }) {
  const style = spacingStyles({ margin });
  const className = classnames('ui-buttongroup', {
    'ui-buttongroup-snap': !loose,
    'ui-buttongroup-block': block,
  });

  // Only updates the children if required
  function updateChildsIfNecessary(childs) {
    if (!disabled) { return childs; }

    return [].concat(children).map((child, index) => {
      if (child && child.type && child.type === Button) {
        const newProps = { ...child.props, key: index, disabled };
        return <Button {...newProps} />;
      } else if (child) {
        const ChildType = child.type;
        return <ChildType key={index} {...child.props} />;
      }

      return child;
    });
  }

  return (
    <div className={className} style={style}>
      {updateChildsIfNecessary(children)}
    </div>
  );
}

ButtonGroup.propTypes = {
  children: React.PropTypes.node,
  loose: React.PropTypes.bool,
  block: React.PropTypes.bool,
  margin: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

ButtonGroup.defaultProps = {
  disabled: false,
};

export default ButtonGroup;
