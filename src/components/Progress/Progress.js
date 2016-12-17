import React from 'react';
import classnames from 'classnames';

const Progress = (props) => {
  const { progress, showValue, small } = props;

  const percentValue = `${progress}%`;
  const className = classnames('ui-progress', { 'ui-progress-small': small });
  const value = showValue ? (
    <div className="ui-progress-value">
      {percentValue}
    </div>
  ) : null;

  return (
    <div className={className}>
      <div className="ui-progress-bar" style={{ width: percentValue }} />
      {value}
    </div>
  );
};

Progress.propTypes = {
  // The progress bar progress (e.g. 98.5)
  progress: React.PropTypes.number.isRequired,

  // The bar can appear smaller
  small: React.PropTypes.bool,

  // Specifies whether the progress value should be displayed
  showValue: React.PropTypes.bool,
};

Progress.defaultProps = {
  showValue: true,
};

export default Progress;
