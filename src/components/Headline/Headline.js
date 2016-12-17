import React from 'react';
import classnames from 'classnames';
import { muteable, spaceable } from '../../decorators';

function Headline({ children, center, right, size }) {
  const className = classnames(
    'ui-headline',
    `ui-headline-size-${size}`,
    {
      'ui-align-center': center,
      'ui-align-right': right,
    }
  );
  return (
    <div className={className}>
      {children}
    </div>
  );
}

Headline.propTypes = {
  size: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  center: React.PropTypes.bool,
  right: React.PropTypes.bool,
};

Headline.defaultProps = {
  size: 'default',
};

export default spaceable(muteable(Headline));
