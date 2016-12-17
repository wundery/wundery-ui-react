import React from 'react';
import classnames from 'classnames';
import { Button } from '../Button';

function Tag({ children, onRemove }) {
  const removeButton = onRemove && (
    <div className={classnames('ui-tag-addon')}>
      <Button icon="trash" onClick={onRemove} />
    </div>
  );

  return (
    <div className={classnames('ui-tag')}>
      <div className="ui-tag-inner">
        <div className={classnames('ui-tag-content')}>
          {children}
        </div>
        {removeButton}
      </div>
    </div>
  );
}

Tag.propTypes = {
  /**
   * The tag content
   * @type {Object}
   */
  children: React.PropTypes.any,

  /**
   * When provided, a little remove button is rendered and triggers
   * this callback
   * @type {Function}
   */
  onRemove: React.PropTypes.func,
};

export default Tag;
