import React, { Component } from 'react';
import classnames from 'classnames';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  render() {
    return (
      <div
        className={classnames('ui-filter')}
        onClick={() => {
          this.setState({
            active: !this.state.active,
          }, () => this.props.onChange(this.state.active));
        }}
      >
        <input
          type="checkbox"
          checked={this.state.active}
        /> {this.props.title}
      </div>
    );
  }
}

Filter.propTypes = {
  title: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default Filter;
