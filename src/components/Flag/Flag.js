import React from 'react';
import classnames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { randomString } from '../../utils';
import { spacingStyles } from '../Spacing/utils';

function Flag(props) {
  const { margin, tooltip, code, text } = props;

  const styles = margin
    ? spacingStyles({ margin })
    : {};

  const className = classnames(
    'ui-flag',
    `ui-flag-${String(code).toLowerCase()}`
  );

  const id = `flag-${randomString(10)}`;

  const flag = <span className={className} />;

  const tooltpMarkup = tooltip && (
    <ReactTooltip effect="solid" id={id}>
      {tooltip}
    </ReactTooltip>
  );

  const flagWithText = text && (
    <span
      className={classnames('ui-flag-wrapper')}
      style={styles}
      data-tip
      data-for={id}
    >
      {flag}
      {props.text}
      {tooltpMarkup}
    </span>
  );

  const flagOnly = !text && (
    <span
      style={styles}
      data-tip
      data-for={id}
    >
      {flag}
      {tooltpMarkup}
    </span>
  );

  return text
    ? flagWithText
    : flagOnly;
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
