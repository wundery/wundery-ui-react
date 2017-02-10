import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon';

function FunnelStep({ done, label, number, onClick }) {
  const className = classnames('ui-funnel-step', {
    'ui-funnel-step-done': done,
  });

  const renderLabel = () => label && <div className="ui-funnel-step-label">{label}</div>;
  const renderNumber = () => {
    if (done) {
      return (
        <div className="ui-funnel-step-icon">
          <Icon name="check" />
        </div>
      );
    }

    return <div className="ui-funnel-step-number">{number}</div>;
  };

  return (
    <div className={className} onClick={onClick}>
      {renderNumber()}
      {renderLabel()}
    </div>
  );
}

FunnelStep.propTypes = {
  label: React.PropTypes.string,
  number: React.PropTypes.number.isRequired,
  done: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

FunnelStep.defaultProps = {
  label: null,
  onClick: null,
  done: false,
};

export default FunnelStep;
