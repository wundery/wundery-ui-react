import React from 'react';
import { Flex, FlexItem } from '../Flex';

function Apps({ children, itemWidths }) {
  return (
    <div className="ui-apps">
      <Flex>
        {[].concat(children).map((child, index) => (
          <FlexItem key={index} widths={itemWidths}>
            {child}
          </FlexItem>
        ))}
      </Flex>
    </div>
  );
}

Apps.propTypes = {
  children: React.PropTypes.any,
  itemWidths: React.PropTypes.object.isRequired,
};

Apps.defaultProps = {
  itemWidths: { md: 4 },
};

export default Apps;
