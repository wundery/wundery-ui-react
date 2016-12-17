import React from 'react';
import { spacingStyles } from '../Spacing/utils';

function ResourceList({ children, title, margin }) {
  const style = spacingStyles({ margin });

  return (
    <div className="ui-resource-list" style={style}>
      {title && (<div className="ui-resource-list-title">{title}</div>)}

      <div className="ui-resource-list-items">
        {children}
      </div>
    </div>
  );
}

ResourceList.propTypes = {
  children: React.PropTypes.any,
  title: React.PropTypes.string,
  margin: React.PropTypes.string,
};

export default ResourceList;
