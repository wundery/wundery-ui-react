import React from 'react';
import classnames from 'classnames';

function TagList({ children }) {
  return (
    <div className={classnames('ui-tag-list')}>
      {children}
    </div>
  );
}

TagList.propTypes = {
  /**
   * The tags
   * @type {Object}
   */
  children: React.PropTypes.any,
};

export default TagList;
