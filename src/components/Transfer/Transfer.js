import React from 'react';
import { Icon } from '../Icon';
import { Flex, FlexItem } from '../Flex';
import { Spacing } from '../Spacing';

function Transfer({ from, to, margin }) {
  return (
    <Spacing margin={margin}>
      <div className="ui-transfer">
        <Flex>
          <FlexItem widths={{ md: 4 }}>
            {from}
          </FlexItem>
          <FlexItem widths={{ md: 4 }}>
            <Icon name="angle-double-right" className="ui-transfer-icon" />
          </FlexItem>
          <FlexItem widths={{ md: 4 }}>
            {to}
          </FlexItem>
        </Flex>
      </div>
    </Spacing>
  );
}

Transfer.propTypes = {
  from: React.PropTypes.node,
  to: React.PropTypes.node,
  margin: React.PropTypes.string,
};

export default Transfer;
