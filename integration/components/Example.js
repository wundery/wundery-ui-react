import React from 'react';
import { Box } from 'wundery-ui-react/components/Box';

function Example({ children, title }) {
  return <Box margin="2xb" label={title} content={children} />;
}

export default Example;
