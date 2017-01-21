import React from 'react';
import classnames from 'classnames';
import { Icon } from '../Icon';

class Sidebar extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    embedded: React.PropTypes.bool,
    expandLabel: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    children: null,
    embedded: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      // This is just for responsive mode and used by CSS. Has no direct
      // effect on the UI
      expanded: false,
    };
  }

  onExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    const { children, embedded, expandLabel } = this.props;
    const { expanded } = this.state;

    const className = classnames('ui-sidebar', {
      'ui-sidebar-embedded': embedded,
      'ui-sidebar-expanded': expanded,
    });

    return (
      <div className={className}>
        <div className="ui-sidebar-expand-wrapper">
          <button onClick={this.onExpandClick}>
            <Icon name="bars" />
            {expandLabel}
          </button>
        </div>
        <div className="ui-sidebar-items">
          {children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
