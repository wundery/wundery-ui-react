import React from 'react';
import classnames from 'classnames';
import KpiHorizon from './KpiHorizon';
import { Spinner } from '../Spinner';

function Kpi({ value, label, horizons, loading, noMargin }) {
  return (
    <div className={classnames('ui-kpi', { 'ui-kpi-no-margin': noMargin })}>
      <div className="ui-kpi-primary">
        <div className="ui-kpi-value">
          {loading ? <Spinner /> : value}
        </div>
        {label && (
          <div className="ui-kpi-description">
            {label}
          </div>
        )}
      </div>
      {horizons.length > 0 && (
        <div className="ui-kpi-horizons">
          {horizons.map((horizon, index) => (
            <KpiHorizon
              key={index}
              value={horizon.value}
              label={horizon.label}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Kpi.propTypes = {
  value: React.PropTypes.node,
  label: React.PropTypes.string,
  loading: React.PropTypes.bool,
  noMargin: React.PropTypes.bool,
  horizons: React.PropTypes.array,
};

Kpi.defaultProps = {
  horizons: [],
};

export default Kpi;
