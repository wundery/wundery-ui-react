import React from 'react';

// Utils
import classnames from 'classnames';

// Decorators
import spaceable from '../../decorators/spaceable';
import alignable from '../../decorators/alignable';

const Wrapper = (props) => {
  const children = props.children;
  const accent = props.accent;
  const highlight = props.highlight;
  const fullheight = props.fullheight;

  return (
    <div
      className={classnames('ui-wrapper', {
        'ui-wrapper-accent': accent,
        'ui-wrapper-highlight': highlight,
        'ui-wrapper-fullheight': fullheight,
      })}
    >
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  accent: React.PropTypes.bool,
  highlight: React.PropTypes.bool,
  fullheight: React.PropTypes.bool,
  children: React.PropTypes.node,
};

Wrapper.defaultProps = {
};

export default alignable(spaceable(Wrapper));
