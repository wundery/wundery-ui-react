import React from 'react';
import classnames from 'classnames';

function WizardStep(props) {
  const { children } = props;

  const className = classnames('ui-wizard-step');

  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default WizardStep;
