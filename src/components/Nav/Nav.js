import React from 'react';
import classnames from 'classnames';
import { GridContainer, GridRow, GridCol } from '../Grid';

const Nav = props => (
  <div
    className={classnames('ui-nav', {
      'ui-nav-fixed': props.fixed,
      'ui-nav-inverse': props.inverse,
    })}
  >
    <GridContainer fluid>
      <GridRow>
        <GridCol>
          <div className={classnames('ui-nav-navitems')}>
            {props.children}
          </div>
        </GridCol>
      </GridRow>
    </GridContainer>
  </div>
);

Nav.propTypes = {
  fixed: React.PropTypes.bool.isRequired,
  inverse: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node,
};


Nav.defaultProps = {
  fixed: false,
  inverse: false,
};

export default Nav;
