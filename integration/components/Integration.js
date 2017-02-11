import React from 'react';
import { Spacing } from 'wundery-ui-react/components/Spacing';
import { HeroUnit } from 'wundery-ui-react/components/HeroUnit';
import { TableExamples } from 'examples';

class Integration extends React.Component {
  render() {
    return (
      <Spacing padding="2x">
        <HeroUnit title="Integration playground" icon="rocket">
          This page let's you play around with <em>wundery-ui-react</em> components.
        </HeroUnit>
        <Spacing margin="2xt">
          <TableExamples />
        </Spacing>
      </Spacing>
    );
  }
}

export default Integration;
