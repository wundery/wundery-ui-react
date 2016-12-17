import React, { Component } from 'react';
import classnames from 'classnames';
import { find, get, isNull } from 'lodash';
import Tab from './Tab';
import { Icon } from '../Icon';
import { Badge } from '../Badge';

class Tabs extends Component {
  componentWillMount() {
    const activeTab = find(this.props.children, c =>
      get(c, 'props.name') === this.props.active);

    this.setState({
      activeIndex: activeTab ? this.props.children.indexOf(activeTab) : 0,
    });
  }

  render() {
    const children = [].concat(this.props.children)
      .filter(child => !isNull(child) && child !== false)
      .map((child, index) => (
        <Tab
          key={index}
          {...Object.assign({}, child.props, {
            active: child.props.active ||
              child.props.name === this.props.active,
            onSelect: () => {
              if (index !== this.state.activeIndex) {
                const nameOrIndex = child.props.name || index;
                if (this.props.onChange) {
                  this.props.onChange(nameOrIndex);
                }

                if (child.props.onSelect) {
                  child.props.onSelect(nameOrIndex);
                }

                this.setState({
                  activeIndex: index,
                });
              }
            },
          })}
        />
      ));

    return (
      <div
        className={classnames('ui-tabs', {
          'ui-tabs-embedded': this.props.embedded,
        })}
      >
        <div className={classnames('ui-tabs-headers')}>
          {children.map((child, index) => (
            <a
              key={index}
              tabIndex={index}
              onClick={() => {
                if (child.props.disabled === false) {
                  child.props.onSelect();
                }
              }}
              className={classnames('ui-tab-header', {
                'ui-tab-header-active': child.props.active,
                'ui-tab-header-disabled': child.props.disabled,
              })}
            >
              {child.props.icon
              ? <Icon name={child.props.icon} />
              : null}
              {child.props.title}
              {child.props.badge
              ? (<Badge margin="1xl" state="info">{child.props.badge}</Badge>)
              : null}
              {child.props.image ? (
                <img
                  className="ui-tab-header-image"
                  src={child.props.image}
                  role="presentation"
                />
            ) : null}
            </a>
        ))}
        </div>
        <div className={classnames('ui-tabs-contents')}>
          {children}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: React.PropTypes.node,
  embedded: React.PropTypes.bool,

  // Name of the active tab (optional)
  active: React.PropTypes.string,

  // Called when the tab changes
  onChange: React.PropTypes.func,
};

Tabs.defaultProps = {
};

export default Tabs;
