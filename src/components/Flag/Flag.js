import React from 'react';
import classnames from 'classnames';
import { spacingStyles } from '../Spacing/utils';
import { Tooltip } from '../Tooltip';

function Flag(props) {
  const { margin, tooltip: tooltipText, code, text } = props;

  const styles = margin
    ? spacingStyles({ margin })
    : {};

  const className = classnames(
    'ui-flag',
    `ui-flag-${String(code).toLowerCase()}`
  );

  const flag = <span className={className} />;

  const flagWithText = text && (
    <span className={classnames('ui-flag-wrapper')} style={styles}>
      {flag}
      {props.text}
    </span>
  );

  const flagOnly = !text && <span style={styles}>{flag}</span>;

  const flagWrapper = text
    ? flagWithText
    : flagOnly;

  const tooltip = tooltipText && (
    <Tooltip content={tooltipText}>
      {flagWrapper}
    </Tooltip>
  );

  return tooltipText
    ? tooltip
    : flagWrapper;
}

Flag.propTypes = {
  /**
   * The country code
   * @type {String}
   */
  code: React.PropTypes.string.isRequired,

  /**
   * An optional text
   * @type {String}
   */
  text: React.PropTypes.string,

  /**
   * Margin definition, e.g. `1xb`
   * @type {String}
   */
  margin: React.PropTypes.string,

  /**
   * An optional tooltip text
   * @type {String}
   */
  tooltip: React.PropTypes.string,
};

export default Flag;
