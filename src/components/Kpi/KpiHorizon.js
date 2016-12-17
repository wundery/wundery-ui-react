import React from 'react';
import classnames from 'classnames';
import { Spinner } from '../Spinner';

function KpiHorizon({ value, label, loading }) {
  return (
    <div className={classnames('ui-kpi-horizon')}>
      {label && (
        <div className="ui-kpi-horizon-description">
          {label}
        </div>
      )}
      <div className="ui-kpi-horizon-value">
        {loading ? <Spinner muted /> : value}
      </div>
    </div>
  );
}

KpiHorizon.propTypes = {
  value: React.PropTypes.node,
  label: React.PropTypes.string,
  loading: React.PropTypes.bool,
};

export default KpiHorizon;
