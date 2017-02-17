import React from 'react';
import { Box, BoxContent } from '../Box';

function Info({ children, margin }) {
  return (
    <Box theme="info" margin={margin}>
      <BoxContent>
        {children}
      </BoxContent>
    </Box>
  );
}

Info.propTypes = {
  children: React.PropTypes.node,
  margin: React.PropTypes.string,
};

Info.defaultProps = {
  children: null,
  margin: null,
};

export default Info;
