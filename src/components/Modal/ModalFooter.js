import React from 'react';
import classnames from 'classnames';

const ModalFooter = props => (
  <div className={classnames('ui-modal-footer')}>
    {props.children}
  </div>
);

ModalFooter.propTypes = {
  children: React.PropTypes.node,
};

export default ModalFooter;
