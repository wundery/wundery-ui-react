import React from 'react';
import { Icon } from '../Icon';

function ResourceLink({ href, children, icon, target }) {
  const rel = target === 'blank'
    ? 'noopener noreferrer'
    : null;

  return (
    <a className="ui-resource-link" href={href} target={target} rel={rel}>
      <Icon name={icon} />
      {children}
    </a>
  );
}

ResourceLink.propTypes = {
  children: React.PropTypes.any,
  icon: React.PropTypes.string,
  href: React.PropTypes.string.isRequired,
  target: React.PropTypes.string.isRequired,
};

ResourceLink.defaultProps = {
  icon: 'external-link-square',
  target: '_blank',
};

export default ResourceLink;
