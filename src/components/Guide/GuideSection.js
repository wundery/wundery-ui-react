// React
import React, { Component } from 'react';

// Utils
import { PrismCode } from 'react-prism';
import classnames from 'classnames';

// Framework components
import { Headline } from '../Headline';
import { Box, BoxContent, BoxHeader } from '../Box';
import { Spacing } from '../Spacing';

class GuideSection extends Component {
  constructor() {
    super();

    this.state = {
      markupShown: false,
    };
  }

  render() {
    const title = this.props.title;
    const description = this.props.description;
    const markup = this.props.markup;
    const code = this.props.code;

    return (
      <div className="ui-guide-section">
        <Spacing margin="2xb">
          <div className="ui-guide-section-title">
            <Headline size="medium">
              {title}
            </Headline>
          </div>
        </Spacing>

        <Spacing margin="2xb">
          <div className="ui-guide-section-description">
            {description}
          </div>
        </Spacing>

        <Box margin="2xb">
          <BoxHeader>
            Preview
          </BoxHeader>
          <BoxContent>
            {markup}
          </BoxContent>
          <BoxHeader>
            <a
              onClick={() => {
                this.setState({ markupShown: !this.state.markupShown });
              }}
            >Markup</a>
          </BoxHeader>
          <div
            className={classnames('ui-guide-section-code', {
              'ui-guide-section-markup-shown': this.state.markupShown,
            })}
          >
            <pre>
              <PrismCode className="language-jsx">
                {code}
              </PrismCode>
            </pre>
          </div>
        </Box>
      </div>
    );
  }
}

GuideSection.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
  markup: React.PropTypes.object.isRequired,
  code: React.PropTypes.string.isRequired,
};

export default GuideSection;
