import React, { Component } from 'react';
import classnames from 'classnames';

class Modal extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    // If set to true, a click on the backdrop will not trigger onClose
    closable: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    open: React.PropTypes.bool,
    size: React.PropTypes.oneOf(['default', 'large']).isRequired,
  };

  static defaultProps = {
    size: 'default',
    closable: true,
  };

  constructor(props) {
    super(props);

    /**
     * Holds a reference to the modal dom element
     * @type {Object}
     */
    this.modal = null;

    this.state = {
      open: props.open,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, true);
  }

  componentWillReceiveProps({ open }) {
    this.setState({ open });
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click', this.boundHandleDocumentClick, true
    );
  }

  handleDocumentClick = (event) => {
    const { closable, onClose } = this.props;

    // Only trigger onClose when the modal is closable
    if (closable && !this.modal.contains(event.target)) {
      this.setState({ open: false });
      onClose();
    }
  }

  modalRef = node => (this.modal = node);

  render() {
    const { children } = this.props;

    const wrapperClassName = classnames('ui-modal-wrapper', {
      'ui-modal-open': this.state.open,
    });
    const modalClassName = classnames('ui-modal', `ui-modal-size-${this.props.size}`);

    return (
      <div className={wrapperClassName}>
        <div className={classnames('ui-modal-backdrop')} />
        <div ref={this.modalRef} className={modalClassName}>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
