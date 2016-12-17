import React, { Component } from 'react';
import classnames from 'classnames';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.boundHandleDocumentClick = this.handleDocumentClick.bind(this);
    this.state = {
      open: props.open,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.boundHandleDocumentClick, true);
  }

  componentWillReceiveProps({ open }) {
    this.setState({ open });
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click', this.boundHandleDocumentClick, true
    );
  }

  handleDocumentClick(event) {
    if (!this.modal.contains(event.target)) {
      this.setState({ open: false }, this.props.onClose);
    }
  }

  render() {
    return (
      <div
        className={classnames('ui-modal-wrapper', {
          'ui-modal-open': this.state.open,
        })}
      >
        <div className={classnames('ui-modal-backdrop')} />
        <div
          ref={node => (this.modal = node)}
          className={classnames('ui-modal', `ui-modal-size-${this.props.size}`)}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  open: React.PropTypes.bool,
  children: React.PropTypes.node,
  size: React.PropTypes.oneOf(['default', 'large']).isRequired,
  onClose: React.PropTypes.func,
};

Modal.defaultProps = {
  size: 'default',
};

export default Modal;
