import React from 'react';
import { Headline } from '../Headline';
import { Spacing } from '../Spacing';
import { Button } from '../Button';

const Guide = (props) => {
  const sections = props.children;
  const title = props.title;
  const description = props.description;
  const ankerName = props.ankerName;
  const topAnkerName = props.topAnkerName;

  return (
    <div className="ui-guide">
      <div name={ankerName} />
      <Spacing margin="2xb">
        <div className="ui-guide-title">
          <Headline>
            {title}
          </Headline>
          {topAnkerName ?
            <Button
              onClick={() => {
                window.location.href = `#${topAnkerName}`;
              }}
              small
            >
            Scroll up
            </Button>
            : null}
        </div>
      </Spacing>

      <Spacing margin="2xb">
        <div className="ui-guide-description">
          {description}
        </div>
      </Spacing>

      <div className="ui-guide-sections">
        {sections}
      </div>
    </div>
  );
};

Guide.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  ankerName: React.PropTypes.string.isRequired,
  topAnkerName: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default Guide;
