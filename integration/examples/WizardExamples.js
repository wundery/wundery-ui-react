import React from 'react';
import { Example, ExampleSet } from 'components';
import { Wizard, WizardStep } from 'wundery-ui-react/components/Wizard';

class WizardExamples extends React.Component {

  constructor(props) {
    super(props);

    /**
     * Initial container state
     *
     * @type {Object}
     */
    this.state = {
      // Tracks the current step
      step: "step2",
    };
  }

  onStepChange = step => this.setState({ step });

  renderDefaultExample() {
    const { step } = this.state;

    return (
      <Example title="Default wizard">
        <Wizard active={step} onChange={this.onStepChange}>
          <WizardStep label="Step 1" done id="step1">
            Content Step 1
          </WizardStep>
          <WizardStep label="Step 2" id="step2">
            Content Step 2
          </WizardStep>
          <WizardStep label="Step 3" id="step3">
            Content Step 3
          </WizardStep>
        </Wizard>
      </Example>
    );
  }

  render() {
    return (
      <ExampleSet title="Wizards">
        {this.renderDefaultExample()}
      </ExampleSet>
    );
  }
}

export default WizardExamples;
