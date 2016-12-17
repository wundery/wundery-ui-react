import React from 'react';

// Utils
import classnames from 'classnames';

const ModalContent = (props) => {
  const children = props.children;

  return (
    <div className={classnames('ui-modal-content')}>
      {children}
    </div>
  );
};

ModalContent.propTypes = {
  children: React.PropTypes.node,
};

export default ModalContent;
