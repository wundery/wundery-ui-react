import React from 'react';
import classnames from 'classnames';

function Wizard(props) {
  const {
    active,
    children,
    disabled,
    onChange,
    prefix,
  } = props;

  /**
   * Builds indicators for each wizardStep
   *
   * @return {array}
   */
  const renderIndicators = () => [].concat(children).map(({ props: wizardStepProps }, index) => {
    const {
      done,
      id,
      label,
    } = wizardStepProps;

    const className = classnames('ui-wizard-indicator', {
      'ui-wizard-indicator-active': id === active,
      'ui-wizard-indicator-done': done,
    });

    const onClick = () => {
      // The entire wizard might be disabled

      if (disabled) { return; }
      // Only trigger change when the new id is different from the current one
      if (id !== active) {
        onChange(id);
      }
    };

    return (
      <div className={className} key={index} onClick={onClick} tabIndex={0}>
        <span className="ui-wizard-indicator-bubble" />
        {label}
      </div>
    );
  });

  /**
   * Filter the active child
   *
   * @return {array}
   */
  const activeChildren = [].concat(children).filter(child => child.props.id === active);

  /**
   * Renders the wizard step contents
   *
   * @return {array}
   */
  const renderChildren = () => activeChildren.map(({ props: wizardStepProps }, index) => {
    const className = classnames('ui-wizard-content');

    return (
      <div className={className} key={index}>
        {wizardStepProps.children}
      </div>
    );
  });

  return (
    <div className="ui-wizard">
      <div className="ui-wizard-indicators">
        {renderIndicators()}
      </div>
      {prefix && <div className="ui-wizard-prefix">{prefix}</div>}
      <div className="ui-wizard-contents">
        {renderChildren()}
      </div>
    </div>
  );
}

Wizard.propTypes = {
  // Triggered on step click (only if the step is not disabled)
  onChange: React.PropTypes.func,

  // Identifier of the active step
  active: React.PropTypes.string,

  // Wizard steps
  children: React.PropTypes.node,

  // Rendered directly after the steps
  prefix: React.PropTypes.node,

  // Whether the steps are all disabled
  disabled: React.PropTypes.bool,
};

Wizard.defaultProps = {
  active: null,
  children: null,
  disabled: false,
  onChange: null,
  prefix: null,
};

export default Wizard;
