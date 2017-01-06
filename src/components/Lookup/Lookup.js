import React from 'react';
import Mousetrap from 'mousetrap';
import { isInteger } from 'lodash';
import { isPromise } from '../../utils';
import { FormItem } from '../Form';
import { Dropdown, DropdownItem } from '../Dropdown';

class Lookup extends React.Component {
  constructor(props) {
    super(props);

    /**
     * Initial container state
     * @type {Object}
     */
    this.state = {
      data: {},
      results: [],
      loading: false,

      /**
       * Index of the currently focussed result item
       * @type {Integer}
       */
      focussedIndex: null,
    };

    /**
     * Bound shortcuts
     * @type {Array}
     */
    this.shortcuts = [];

    this.cancelLookup = this.cancelLookup.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDropdownOutsideClick = this.onDropdownOutsideClick.bind(this);
    this.selectFocussed = this.selectFocussed.bind(this);
  }

  componentDidMount() {
    this.bindShortcuts();
  }

  componentWillUnmount() {
    this.unbindShortcuts();
  }

  onChange(term) {
    const { onLoad } = this.props;

    if (term === '') {
      this.setState({ term: '', results: [], dropdownOpen: false });
      return;
    }

    this.setState({ loading: true, term });

    const onLoadResult = onLoad(term);

    if (!isPromise(onLoadResult)) { throw new Error('onLoad must return a Promise'); }

    onLoadResult
      .then(results => this.setState({
        loading: false,
        results,
      }))
      .catch((error) => {
        this.setState({ loading: false, results: [] });
        throw error;
      });
  }

  onDropdownOutsideClick() {
    this.setState({ dropdownOpen: false });
  }

  onResultItemClick(resultItem) {
    const { onSelect } = this.props;

    this.setState({ term: '', results: [], focussedIndex: null });

    onSelect(resultItem);
  }

  focusNext() {
    const { results, focussedIndex } = this.state;

    if (results.length > 0) {
      if (focussedIndex === null) {
        this.setState({ focussedIndex: 0 });
      } else if (focussedIndex < results.length - 1) {
        this.setState({ focussedIndex: focussedIndex + 1 });
      }
    }
  }

  focusPrevious() {
    const { focussedIndex } = this.state;

    if (focussedIndex > 0) {
      this.setState({ focussedIndex: focussedIndex - 1 });
    }
  }

  selectFocussed() {
    const { focussedIndex, results } = this.state;

    if (isInteger(focussedIndex)) {
      this.onResultItemClick(results[focussedIndex]);
    }
  }

  cancelLookup() {
    this.setState({ results: [], focussedIndex: null });
  }

  bindShortcuts() {
    Mousetrap.bind('down', this.focusNext);
    Mousetrap.bind('up', this.focusPrevious);
    Mousetrap.bind('enter', this.selectFocussed);
    Mousetrap.bind('esc', this.cancelLookup);
  }

  unbindShortcuts() {
    Mousetrap.unbind('down');
    Mousetrap.bind('up');
    Mousetrap.unbind('enter');
    Mousetrap.unbind('esc');
  }

  render() {
    const { itemBuilder, inputAddon, placeholder, prefix } = this.props;
    const { results, term, loading, focussedIndex } = this.state;

    const dropdown = (
      <Dropdown
        open={results.length > 0}
        onOutsideClick={this.onDropdownOutsideClick}
        focussedIndex={focussedIndex}
      >
        {results.map((resultItem, index) => (
          <DropdownItem
            key={index}
            body={itemBuilder(resultItem)}
            onClick={() => this.onResultItemClick(resultItem)}
          />
        ))}
      </Dropdown>
    );

    return (
      <FormItem
        type="text"
        name="term"
        value={term}
        dropdown={dropdown}
        onChange={this.onChange}
        innerAddon={inputAddon}
        placeholder={placeholder}
        spinner={loading}
        prefix={prefix}
      />
    );
  }
}

Lookup.propTypes = {
  /**
   * Invoked when the user types something
   * @type {Function}
   */
  onLoad: React.PropTypes.func.isRequired,

  /**
   * Called when the user selects an item
   * @type {Function}
   */
  onSelect: React.PropTypes.func.isRequired,

  /**
   * Invoked to render the dropdown items
   * @type {Function}
   */
  itemBuilder: React.PropTypes.func.isRequired,

  /**
   * Additional JSX rendered as addon into the input
   * @type {Object}
   */
  inputAddon: React.PropTypes.node,

  /**
   * Input placeholder
   * @type {String}
   */
  placeholder: React.PropTypes.string,

  /**
   * Input prefix
   * @type {String}
   */
  prefix: React.PropTypes.string,
};

export default Lookup;
