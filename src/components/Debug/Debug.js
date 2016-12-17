import React from 'react';
import { Box, BoxContent, BoxHeader } from '../Box';

function Debug({ data, label, hide }) {
  return !hide && (
    <Box>
      {label && <BoxHeader>{label}</BoxHeader>}
      <BoxContent>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </BoxContent>
    </Box>
  );
}

Debug.propTypes = {
  data: React.PropTypes.any.isRequired,

  // An optional label
  label: React.PropTypes.string,

  hide: React.PropTypes.bool,
};

export default Debug;
