import React from 'react';
import { Headline } from 'wundery-ui-react/components/Headline';

function ExampleSet({ children, title }) {
  return (
    <div>
      <Headline size="small" margin="2xb">
        {title}
      </Headline>
      {children}
    </div>
  );
}

ExampleSet.propTypes = {
  children: React.PropTypes.node.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default ExampleSet;
