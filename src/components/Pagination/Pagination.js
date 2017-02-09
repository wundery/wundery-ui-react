import React, { Component } from 'react';

// Utils
import classnames from 'classnames';
import { parseInt, floor } from 'lodash';
import times from 'lodash/times';

// Framework components
import { Icon } from '../Icon';

class Pagination extends Component {
  componentWillMount() {
    this.setState({
      group: 0,
    });
  }

  componentWillReceiveProps(nextProps) {
    const divisionResult = nextProps.current / this.props.collapseThreshold;
    const currentGroupIndex = divisionResult % 1 === 0
      ? parseInt(divisionResult - 1)
      : parseInt(floor(divisionResult));
    this.setState({
      group: currentGroupIndex,
    });
  }

  render() {
    const collapseThreshold = parseInt(this.props.collapseThreshold);
    const count = parseInt(this.props.count || 0);
    const groups = [];
    const groupsCount = parseInt(Math.ceil(count / collapseThreshold));
    const current = parseInt(this.props.current);
    const onClick = (page) => {
      if (page !== current && page >= 1 && page <= count) {
        this.props.onClick(page);
      }
    };
    const label = this.props.label
      ? (
        <div className={classnames('ui-pagination-info')}>
          {this.props.label}
        </div>
      )
      : null;

    const previous = (
      <div className="ui-pagination-control-previous">
        <a onClick={() => onClick(current - 1)}>
          <Icon name="caret-left" />
        </a>
      </div>
    );

    const next = (
      <div className="ui-pagination-control-next">
        <a onClick={() => onClick(current + 1)}>
          <Icon name="caret-right" />
        </a>
      </div>
    );

    const changeGroup = (group) => {
      this.setState({
        group: group < 0 ? 0 : Math.min(group, groupsCount - 1),
      });
    };

    const previousGroup = (
      groupsCount > 1 && this.state.group > 0
        ? <div className="ui-pagination-control-previous-group">
          <a onClick={() => changeGroup(this.state.group - 1)}>
            ...
          </a>
        </div>
        : null
    );

    const nextGroup = (
      groupsCount > 1 && this.state.group < groupsCount - 1
        ? <div className="ui-pagination-control-next-group">
          <a onClick={() => changeGroup(this.state.group + 1)}>
            ...
          </a>
        </div>
        : null
    );

    const pages = [];
    let index = 0;

    times(count, () => {
      const page = index + 1;
      pages.push(
        <div
          key={index}
          className={classnames('ui-pagination-page', {
            'ui-pagination-page-active': page === current,
          })}
        >
          <a onClick={() => onClick(page)}>
            {page}
          </a>
        </div>
      );
      index += 1;
    });

    times(groupsCount, (i) => {
      const fromIndex = i * collapseThreshold;
      const toIndex = Math.min(
        (i * collapseThreshold) + collapseThreshold,
        count
      );
      groups.push(
        <div
          key={i}
          className={classnames('ui-pagination-pagegroup', {
            'ui-pagination-pagegroup-current': this.state.group === i,
          })}
        >
          {pages.slice(fromIndex, toIndex)}
        </div>
      );
    });

    return (
      <div
        className={classnames('ui-pagination', {
          'ui-pagination-disabled': this.props.disabled,
        })}
      >
        <div className={classnames('ui-pagination-pages')}>
          {previous}
          {previousGroup}
          <div className={classnames('ui-pagination-pagegroups')}>
            {groups}
          </div>
          {nextGroup}
          {next}
        </div>
        {label}
      </div>
    );
  }
}

Pagination.propTypes = {
  label: React.PropTypes.string,
  count: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  current: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  collapseThreshold: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
};

Pagination.defaultProps = {
  current: 1,
  collapseThreshold: 10,
};

export default Pagination;
