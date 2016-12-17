import React from 'react';
import classnames from 'classnames';
import { get } from 'lodash';
import Tab from './TabV2';
import { Icon } from '../Icon';
import { Badge } from '../Badge';

function Tabs({ embedded, children, onChange, active }) {
  const filterTabs = item => get(item, 'type') === Tab;

  function renderHeader(tab, index) {
    const tabName = get(tab, 'props.id');
    const onClick = () => {
      if (tabName !== active) {
        onChange(tabName);
      }
    };
    const className = classnames('ui-tab-header', {
      'ui-tab-header-active': tabName === active,
    });
    const icon = get(tab, 'props.icon');
    const title = get(tab, 'props.title');
    const badge = get(tab, 'props.badge');
    const image = get(tab, 'props.image');

    return (
      <a key={index} tabIndex={index} onClick={onClick} className={className}>
        {icon && <Icon name={icon} />}
        {title}
        {badge && <Badge margin="1xl" theme="info">{badge}</Badge>}
        {image && (<img src={image} role="presentation" />)}
      </a>
    );
  }

  function renderHeaders() {
    return (
      <div className="ui-tabs-headers">
        {children.filter(filterTabs).map(renderHeader)}
      </div>
    );
  }

  function renderTab(tab, index) {
    const tabName = get(tab, 'props.id');

    if (tabName !== active) { return null; }

    const builder = get(tab, 'props.builder');

    const newProps = { ...tab.props,
      key: index,
      children: builder(),
    };

    return <Tab {...newProps} />;
  }

  function renderTabs() {
    return (
      <div className="ui-tabs-contents">
        {children.filter(filterTabs).map(renderTab)}
      </div>
    );
  }

  const className = classnames('ui-tabs', {
    'ui-tabs-embedded': embedded,
  });
  return (
    <div className={className}>
      {renderHeaders()}
      {renderTabs()}
    </div>
  );
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
