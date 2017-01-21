import React, { Component } from 'react';
import classnames from 'classnames';

class Modal extends Component {

  static bodyClassName = 'ui-modal-attached';

  /**
   * Prop types
   * @type {Object}
   */
  static propTypes = {
    children: React.PropTypes.node,
    // If set to true, a click on the backdrop will not trigger onClose
    closable: React.PropTypes.bool,

    // Triggered on close
    onClose: React.PropTypes.func,

    // Defines the current open state
    open: React.PropTypes.bool,

    // Defines the possible sizes - will be translated to css classes
    size: React.PropTypes.oneOf(['default', 'large', 'small']).isRequired,
  };

  /**
   * Default props
   * @type {Object}
   */
  static defaultProps = {
    closable: true,
    size: 'default',
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
    const { open } = this.state;

    document.addEventListener('click', this.handleDocumentClick, true);

    this.setBodyClass(open);
  }

  componentWillReceiveProps({ open }) {
    this.setState({ open });
    this.setBodyClass(open);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, true);
    this.removeBodyClass();
  }

  setBodyClass(isOpen) {
    if (isOpen) {
      this.addBodyClass();
    } else {
      this.removeBodyClass();
    }
  }

  setModalRef = (element) => {
    if (element) {
      this.modal = element;
    }
  }

  addBodyClass() {
    document.getElementsByTagName('body')[0].classList.add(Modal.bodyClassName);
  }

  removeBodyClass() {
    document.getElementsByTagName('body')[0].classList.remove(Modal.bodyClassName);
  }

  handleDocumentClick = (event) => {
    const { closable, onClose } = this.props;

    // Only trigger onClose when the modal is closable and the click is not performed
    // somewhere inside the modal
    if (closable && !this.modal.contains(event.target)) {
      this.setState({ open: false });
      onClose();
    }
  }

  render() {
    const { children, size } = this.props;
    const { open } = this.state;

    const wrapperClassName = classnames('ui-modal-wrapper', {
      'ui-modal-open': open,
    });
    const modalClassName = classnames('ui-modal', `ui-modal-size-${size}`);

    return (
      <div className={wrapperClassName}>
        <div className={classnames('ui-modal-backdrop')} />
        <div ref={this.setModalRef} className={modalClassName}>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
