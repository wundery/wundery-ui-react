import React, { Component } from 'react';
import classnames from 'classnames';

class Filter extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool,
  };

  static defaultProps = {
    active: false,
  };

  constructor(props) {
    super(props);

    const { active } = this.props;

    this.state = {
      active,
    };
  }

  onFilterChange = () => {
    const { onChange } = this.props;
    const { active } = this.state;

    const nextActive = !active;

    this.setState({ active: nextActive });

    onChange(nextActive);
  }

  render() {
    const { title } = this.props;
    const { active } = this.state;

    return (
      <div className={classnames('ui-filter')} onClick={this.onFilterChange}>
        <input
          type="checkbox"
          checked={active}
        /> {title}
      </div>
    );
  }
}

export default Filter;
