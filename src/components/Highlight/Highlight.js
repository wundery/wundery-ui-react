/* eslint-disable react/no-danger */

import React from 'react';

const Highlight = props => (
  <span
    className="ui-highlight"
    dangerouslySetInnerHTML={{ __html: props.input }}
  />
);

Highlight.propTypes = {
  input: React.PropTypes.string.isRequired,
};

export default Highlight;
