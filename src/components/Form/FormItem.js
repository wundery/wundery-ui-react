import React, { Component } from 'react';
import classnames from 'classnames';
import { isString } from 'lodash';
import { Button, ButtonGroup } from '../Button';
import { Spinner } from '../Spinner';
import { Badge } from '../Badge';

class FormItem extends Component {

  /**
   * Returns whether errors should be displayed
   */
  static shouldShowErrors(pristineValue, errors, state) {
    if (state && state.showError) { return true; }
    if (pristineValue === false) { return true; }
    if (state && !state.showError && !state.pristine && errors.length > 0) { return true; }

    return false;
  }

  constructor(props) {
    super(props);

    const { pristine, errors } = props;

    this.onChange = this.onChange.bind(this);

    this.state = {
      // Specifies that this field was never touched and thus should not display
      // any errors, regardless if they exist.
      pristine,

      // Specifieds whether errors should be shown.
      showErrors: FormItem.shouldShowErrors(pristine, errors, this.state),
    };
  }

  /**
   * Checkes the next props and decides whether errors should be shown.
   */
  componentWillReceiveProps(nextProps) {
    const { pristine, errors } = nextProps;

    const shouldShowErrors = FormItem.shouldShowErrors(pristine, errors, this.state);

    if (shouldShowErrors && shouldShowErrors !== this.state.showErrors) {
      this.setState({ showErrors: true });
    }
  }

  isCheckboxDefault() {
    const { type } = this.props;
    return type == 'checkbox-default';
  }

  onChange(newValue) {
    const { onChange } = this.props;
    const guardRegex = this.getGuardRegex();

    this.setState({ pristine: false });

    if (guardRegex) {
      if (String(newValue).match(guardRegex)) {
        onChange(newValue);
      }
    } else {
      onChange(newValue);
    }
  }

  getGuardRegex() {
    const { guard } = this.props;

    switch (guard) {
      case 'decimal':
        return /^$|^-?[0-9]+[.,]?([0-9]*)+$/;

      case 'number':
        return /^-?[0-9]*$/;

      case 'posNumber':
        return /^[0-9]*$/;

      default:
        return null;
    }
  }

  renderErrors() {
    const { errors, hideErrorMessage } = this.props;
    const { showErrors } = this.state;

    return !hideErrorMessage && errors.length > 0 && showErrors && (
      <div className={classnames('ui-form-item-errors')}>
        {errors.map((error, index) => (
          <div key={index} className={classnames('ui-form-error')}>
            {error.message}
          </div>
        ))}
      </div>
    );
  }

  renderLabel() {
    const { label, required, requiredText, labelAddon, labelNote, bold } = this.props;

    if (!label) { return null; }

    if (this.isCheckboxDefault()) {
      const classNameLabel =  classnames("ui-form-label-checkbox-default", { 'ui-form-label-bold': bold })
      return (
        <div className={classNameLabel}>
          {label}
        </div>
      )
    } else {
      return (
        <div className={classnames('ui-form-label')}>
          <div className={classnames('ui-form-label-text')}>
            {label}
            {labelNote && <div className={classnames('ui-form-label-note')}>
                {labelNote}
              </div>
            }
          </div>
          {required && (
            <div className="ui-form-label-required">
              <Badge theme="info">{requiredText}</Badge>
            </div>
          )}
          {labelAddon && <div className="ui-form-label-addon">{labelAddon}</div>}
        </div>
      );
    }
  }

  renderTextControl() {
    const { onChange } = this;
    const { type, value, defaultValue, tabIndex, placeholder, disabled, controlRef, hide, width, allowShowZero } = this.props;
    const classNames = classnames('ui-form-control', `ui-form-input-width-${width}`);
    const valueInput = allowShowZero ? value : (value || "");

    const input = (
      <input
        type={type}
        onChange={event => onChange(event.target.value)}
        value={valueInput}
        defaultValue={defaultValue}
        tabIndex={tabIndex}
        placeholder={placeholder}
        disabled={disabled || hide}
        ref={controlRef}
        className={classNames}
      />
    );

    return input;
  }

  renderSelectControl() {
    const { value, tabIndex, disabled, options, controlRef, forceUpdate } = this.props;
    const { onChange } = this;

    const valueProp = forceUpdate ? {value: value} : {} ;

    const input = (
      <select
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
        className={classnames('ui-form-control')}
        tabIndex={tabIndex}
        defaultValue={value}
        ref={controlRef}
        {...valueProp}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );

    return input;
  }

  renderTextAreaControl() {
    const { value, defaultValue, tabIndex, disabled, controlRef } = this.props;
    const { onChange } = this;

    const input = (
      <textarea
        onChange={event => onChange(event.target.value)}
        value={value || ''}
        defaultValue={defaultValue}
        tabIndex={tabIndex}
        disabled={disabled}
        ref={controlRef}
        className={classnames('ui-form-control')}
      />
    );

    return input;
  }

  renderCheckboxControl() {
    const { value, tabIndex, disabled, controlRef } = this.props;
    const { onChange } = this;

    const input = (
      <input
        onChange={event => onChange(event.target.checked)}
        checked={!!value}
        tabIndex={tabIndex}
        type="checkbox"
        disabled={disabled}
        ref={controlRef}
        className={classnames('ui-form-control')}
      />
    );

    return input;
  }

  renderStaticControl() {
    const { children } = this.props;

    return children;
  }

  renderCustomControl() {
    const { value, element } = this.props;
    const { props: elementProps, type: ElementType } = element;

    // Inject the correct value and onChange into the element
    const newProps = { ...elementProps,
      onChange: this.onChange,
      value: value || '',
    };

    return <ElementType {...newProps} />;
  }

  renderControl() {
    const { type, element } = this.props;

    if (element) {
      return this.renderCustomControl();
    }

    switch (type) {

      case 'text':
      case 'password':
        return this.renderTextControl();

      case 'select':
        return this.renderSelectControl();

      case 'textarea':
      case 'rte':
        return this.renderTextAreaControl();

      case 'checkbox-default':
      case 'checkbox':
        return this.renderCheckboxControl();

      case 'static':
        return this.renderStaticControl();

      default:
        return <span>Unknown element {type}</span>;
    }
  }

  renderInput() {
    const {
      addon,
      description,
      dropdown,
      errors,
      innerAddon,
      prefix,
      spinner,
      suffix,
      right
    } = this.props;
    const { showErrors } = this.state;

    const className = classnames('ui-form-input', {
      'ui-form-input-with-errors': errors.length > 0 && showErrors,
    });

    const prefixClassName = classnames('ui-form-control-group-prefix', prefix && {
      'ui-form-control-group-content-text': isString(prefix),
      'ui-form-control-group-content-button': prefix.type === Button,
    });

    const suffixClassName = classnames('ui-form-control-group-suffix', suffix && {
      'ui-form-control-group-content-text': isString(suffix),
      'ui-form-control-group-content-button': suffix.type === Button,
      'ui-form-control-group-content-buttongroup': suffix.type === ButtonGroup,
    });

    const controlGroupWrapperClassName = classnames('ui-form-control-group-wrapper', {
      'ui-form-control-group-wrapper-with-addon': !!innerAddon,
    });

    const controlGroupClassName = classnames('ui-form-control-group', {
      'ui-form-control-group-with-suffix': !!suffix,
      'ui-form-control-group-with-prefix': !!prefix,
    });

    if (this.isCheckboxDefault()) {
      const classNameCheckbox =  classnames('ui-form-item-checkbox-default', { 'ui-form-input-checkbox-default-right': right })
      return (
        <div className={classNameCheckbox}>
          {this.renderControl()}
        </div>
      )
    }else {
      return (
        <div className={className}>
          <div className={controlGroupWrapperClassName}>
            <div className={controlGroupClassName}>
              {prefix && (<div className={prefixClassName}>{prefix}</div>)}
              <div className={"ui-form-control-wrapper " }>
                {this.renderControl()}
                {spinner && (<div className="ui-form-control-spinner"><Spinner /></div>)}
              </div>
              {suffix && (<div className={suffixClassName}>{suffix}</div>)}
            </div>
            {dropdown}
            {innerAddon && (<div className="ui-form-control-group-addon">{innerAddon}</div>)}
          </div>
          {this.renderErrors()}
          {description && (<div className="ui-form-input-description">{description}</div>)}
          {addon && (<div className="ui-form-input-addon">{addon}</div>)}
        </div>
      );
    }
  }

  render() {
    const { compact, type, inline, right } = this.props;

    const className = classnames(
      'ui-form-item',
      `ui-form-item-type-${type || 'custom'}`, {
        'ui-form-item-compact': !this.isCheckboxDefault() && compact,
        'ui-form-item-inline': !this.isCheckboxDefault() && inline,
      }
    );

    if (this.isCheckboxDefault()) {
      return (
        <div className={className}>
          {!right && this.renderInput()}
          {this.renderLabel()}
          {right && this.renderInput()}
        </div>
      );
    } else {
      return (
        <div className={className}>
          {this.renderLabel()}
          {this.renderInput()}
        </div>
      );
    }
  }
}

FormItem.propTypes = {
  addon: React.PropTypes.node,
  children: React.PropTypes.node,
  compact: React.PropTypes.bool,
  defaultValue: React.PropTypes.any,
  description: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  dropdown: React.PropTypes.node,
  element: React.PropTypes.object,
  errors: React.PropTypes.array.isRequired,
  guard: React.PropTypes.string,
  innerAddon: React.PropTypes.node,
  label: React.PropTypes.string,
  labelAddon: React.PropTypes.object,
  onChange: React.PropTypes.func,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool
  })),
  placeholder: React.PropTypes.string,
  prefix: React.PropTypes.node,
  pristine: React.PropTypes.bool,
  required: React.PropTypes.bool,
  requiredText: React.PropTypes.string.isRequired,
  suffix: React.PropTypes.any,
  tabIndex: React.PropTypes.number,
  type: React.PropTypes.string,
  value: React.PropTypes.any,

  // If true, the error message will be hidden
  hideErrorMessage: React.PropTypes.bool,

  // Whether the form should be rendered inline
  inline: React.PropTypes.bool,

  // Specifies whether a spinner should be rendered
  spinner: React.PropTypes.bool,

  // A ref which is applied to the specific control element (e.g for focus)
  controlRef: React.PropTypes.func,

  hide: React.PropTypes.bool,

  width: React.PropTypes.oneOf(['short', 'normal', 'full']),

  labelNote: React.PropTypes.string,

  allowShowZero: React.PropTypes.bool,

  right: React.PropTypes.bool,

  bold: React.PropTypes.bool,
};

FormItem.defaultProps = {
  children: null,
  controlRef: () => {},
  disabled: false,
  errors: [],
  onChange: () => {},
  options: [],
  requiredText: '*',
  hide: false,
  width: 'full',
  allowShowZero: false,
  right: false,
  bold: false
};

export default FormItem;
