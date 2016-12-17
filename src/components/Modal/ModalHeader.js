import React from 'react';
import classnames from 'classnames';

const ModalHeader = props => (
  <div className={classnames('ui-modal-header')}>
    {props.children}
  </div>
);

ModalHeader.propTypes = {
  children: React.PropTypes.node,
};

export default ModalHeader;
