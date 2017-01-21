import React, { Component } from 'react';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { randomString, spacing } from '../../utils';
import { Icon } from '../Icon';
import { Dropdown } from '../Dropdown';
import { Spinner } from '../Spinner';

class Button extends Component {
  constructor(props) {
    super(props);

    this.id = randomString(10);

    this.state = {
      // Tracks the open state of the dropdown
      dropdownOpen: false,
    };
  }

  componentWillMount() {
    const { dropdown } = this.props;

    // If the button should open a dropdown, we register a handler that
    // listens to all clicks on the document.
    if (dropdown) {
      document.addEventListener('click', this.handleDocumentClick, true);
    }
  }


  componentWillUnmount() {
    const { dropdown } = this.props;

    // Remove the event listener
    if (dropdown) {
      document.removeEventListener('click', this.handleDocumentClick, true);
    }
  }

  setDropdownRef = (element) => {
    if (element) {
      this.dropdownWrapper = element;
    }
  }

  /**
   * This checks whether the clicked event target is a child of
   * the dropdown wrapper. If not it is considered to be an outside click
   * and closes the dropdown.
   */
  handleDocumentClick = (event) => {
    if (!this.dropdownWrapper.contains(event.target)) {
      this.setState({
        dropdownOpen: false,
      });
    }
  }

  render() {
    const {
      block,
      children,
      className: originalClassName,
      confirmMessage,
      description,
      disabled: originalDisabled,
      dropdown: originalDropdown,
      icon: originalIcon,
      iconSize,
      large,
      left,
      link: originalLInk,
      loading,
      margin,
      onClick: originialOnClick,
      small,
      suffixIcon,
      theme,
      tooltip,
      type,
    } = this.props;
    const { dropdownOpen } = this.state;

    const disabled = originalDisabled || loading;
    const icon = originalIcon || (loading ? 'circle-o-notch' : null);
    const iconOnly = !children && icon;

    // If a dropdown is given, it must be enhanced with the local
    // open/closed state
    const newProps = {
      open: dropdownOpen,
      onItemClick: () => this.setState({ dropdownOpen: false }),
    };
    const dropdownProps = originalDropdown && { ...originalDropdown.props, ...newProps };
    const dropdown = originalDropdown && <Dropdown {...dropdownProps} />;

    // If a dropdown is specified, the onClick can be overwritten
    // to update the state
    const onClick = dropdown ? () => {
      this.setState(state => ({ dropdownOpen: !state.dropdownOpen }));
    } : originialOnClick;

    // If an icon name is specified, a prepend must be added
    const prependClassName = classnames('ui-button-prepend', {
      'ui-button-prepend-no-margin': iconOnly,
    });
    const prepend = icon && (
      <span className={prependClassName}>
        {loading ? <Spinner /> : <Icon name={icon} size={iconSize} />}
      </span>
    );

    // If a dropdown is specified, a append must be specified which
    // displays a caert
    const append = ((dropdown && !icon) || suffixIcon) && (
      <span className={classnames('ui-button-append')}>
        {dropdown && !icon && <Icon name="caret-down" />}
        {suffixIcon && <Icon name={suffixIcon} />}
      </span>
    );

    const className = classnames(
      'ui-button',
      `ui-button-type-${theme}`, {
        'ui-button-size-small': small,
        'ui-button-size-large': large,
        'ui-button-size-block': block,
        'ui-button-state-disabled': disabled,
        'ui-button-state-loading': loading,
        'ui-button-left': left,
      },
      originalClassName,
    );

    const onClickWrapper = (event) => {
      if (disabled) { return false; }

      const performOnClick = () => {
        // we stop event propagation to ensure that other components
        // do not receive this onClick as an onClick.
        event.stopPropagation();
        onClick(event);
      };

      if (confirmMessage) {
        // eslint-disable-next-line
        if (window.confirm(confirmMessage)) {
          return performOnClick();
        }

        return false;
      }

      return performOnClick();
    };

    const inner = (
      <span className={classnames('ui-button-inner')}>
        {prepend}
        {children && (
          <span className={classnames('ui-button-content')}>
            {children}
            {description && (
              <span className={classnames('ui-button-description')}>
                {description}
              </span>
            )}
          </span>
        )}
        {append}
      </span>
    );

    const style = spacing({ margin });

    let link = originalLInk;
    if (link) {
      link = link(inner);
      const LinkType = link.type;
      const linkProps = { ...link.props, ...{ className } };
      link = <LinkType {...linkProps} style={style} title={tooltip} />;
    }

    const id = `button-${this.id}`;

    const button = link || (
      <button
        type={type}
        onClick={onClickWrapper}
        className={className}
        value={this.props.value}
        style={style}
        data-tip
        data-for={id}
      >
        {inner}
        {tooltip && (
          <ReactTooltip effect="solid" id={id}>
            {tooltip}
          </ReactTooltip>
        )}
      </button>
    );

    const dropdownClassName = classnames('ui-dropdown-wrapper', {
      'ui-dropdown-wrapper-block': block,
    });

    if (dropdown) {
      return (
        <div ref={this.setDropdownRef} className={dropdownClassName}>
          {button}
          {dropdown}
        </div>
      );
    }

    return button;
  }
}

Button.propTypes = {
  type: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string,
  iconSize: React.PropTypes.string,
  left: React.PropTypes.bool,
  large: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  small: React.PropTypes.bool.isRequired,
  disabled: React.PropTypes.bool,
  block: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  dropdown: React.PropTypes.object,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  description: React.PropTypes.string,
  confirmMessage: React.PropTypes.node,
  link: React.PropTypes.func,
  margin: React.PropTypes.string,
  tooltip: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
  theme: React.PropTypes.string.isRequired,
  suffixIcon: React.PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  small: false,
  disabled: false,
  block: false,
  loading: false,
  theme: 'default',
  type: 'button',
  iconSize: 'default',
};

export default Button;
