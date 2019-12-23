import React, { Component } from 'react';
import classnames from 'classnames';
import { isUndefined } from 'lodash';
import { isPromise } from '../../utils';
import { Icon } from '../Icon';
import { Copyable } from '../Copyable';
import { Form, FormItem } from '../Form';
import { Button, ButtonGroup } from '../Button';

class TableCell extends Component {

  static propTypes = {
    bold: React.PropTypes.bool,
    center: React.PropTypes.bool,
    copyable: React.PropTypes.bool,
    icon: React.PropTypes.string,
    onSort: React.PropTypes.func,
    orderHandle: React.PropTypes.bool,
    right: React.PropTypes.bool,
    title: React.PropTypes.node,
    value: React.PropTypes.node,
    width: React.PropTypes.number,
    expander: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    datum: React.PropTypes.object,
    editable: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    onUpdateDatum: React.PropTypes.func,
    onValidate: React.PropTypes.func,
    cancelLabel: React.PropTypes.string,
    breakCell: React.PropTypes.bool
  };

  static defaultProps = {
    header: null,
    onEdit: null,
    editable: false,
    expander: false,
    datum: null,
    onUpdateDatum: null,
    onValidate: null,
    cancelLabel: null,
    breakCell: false,
  };

  constructor(props) {
    super(props);

    /**
     * Reference to the edit control input.
     */
    this.editControlRef = null;

    this.state = {
      sorted: false,

      // Specifies whether this cell is in edit mode
      editing: false,

      // This tracks the editing updates until commit
      editingValue: null,

      // Validation errors happening during editing
      editingErrors: this.getEditingErrors(this.getEditingValue()),

      // Specifies whether a commit is in progress
      saving: false,
    };
  }

  onCellClick = () => {
    const { onEdit } = this.props;

    if (onEdit) {
      this.setState({
        editing: true,
        editingValue: this.getEditingValue(),
      }, this.focusEditControl);
    }

    return null;
  }

  onCancelClick = () => {
    this.setState({
      editing: false,
      editingValue: null,
    });
  }

  onSaveClick = () => {
    const { datum, editable, onEdit } = this.props;

    if (editable) {
      const prevValue = this.getEditingValue();
      const { editingValue } = this.state;

      // Skip everything if the value did not change
      if (prevValue === editingValue) {
        this.setState({
          editing: false,
          editingValue: null,
        });
      } else {
        const newDatum = { ...datum, [editable]: editingValue };

        const result = onEdit(newDatum);

        if (isPromise(result)) {
          this.setState({ saving: true });

          result.then(nextDatum => this.onSaveFinished(nextDatum));
        } else {
          this.onSaveFinished(result);
        }
      }
    }
  }

  onSaveFinished = (newDatum) => {
    const { datum, onUpdateDatum } = this.props;

    this.setState({
      editing: false,
      editingValue: null,
      saving: false,
    });

    if (onUpdateDatum) {
      onUpdateDatum(datum, newDatum);
    }
  }

  onEditingValueChange = (value) => {
    this.setState({
      editingValue: value,
      editingErrors: this.getEditingErrors(value),
    });
  }

  /**
   * Required to focus the field
   */
  setEditControlRef = (ref) => {
    this.editControlRef = ref;
  }

  /**
   * Determine the value to be edited from the datum and `editable` prop.
   * If it is not available, use an empty string.
   *
   * @return {string}
   */
  getEditingValue() {
    const { datum, editable } = this.props;

    if (!datum) { return ''; }

    return datum[editable] || '';
  }

  /**
   * Get errors for this field
   *
   * @param {string} value
   * @return {array}
   */
  getEditingErrors(value) {
    const { datum, editable, onValidate } = this.props;

    if (editable && onValidate) {
      const payload = { ...datum, [editable]: value };

      const errors = onValidate(payload);

      return errors;
    }

    return [];
  }

  focusEditControl = () => {
    if (this.editControlRef) {
      this.editControlRef.focus();
    }
  }

  renderClassName() {
    const {
      bold,
      center,
      expander,
      onEdit,
      orderHandle,
      right,
      customClass,
      breakCell,
    } = this.props;
    const { editing } = this.state;

    if(breakCell) {
      classnames('ui-table-cell-break', {}, customClass);
    }
    else {
      return classnames('ui-table-cell', {
        'ui-table-cell-bold': bold,
        'ui-table-cell-center': center,
        'ui-table-cell-editable': onEdit,
        'ui-table-cell-editing': editing,
        'ui-table-cell-expander': expander,
        'ui-table-cell-order-handle': orderHandle,
        'ui-table-cell-right': right,
      }, customClass);
    }
  }

  renderStyles() {
    const { width } = this.props;

    return {
      flex: width ? `0 0 ${width}px` : null,
    };
  }

  renderEditingCell() {
    const { cancelLabel } = this.props;
    const { editingValue, editingErrors, saving } = this.state;

    const suffix = (
      <ButtonGroup>
        <Button
          icon="save"
          loading={saving}
          onClick={this.onSaveClick}
          type="submit"
          disabled={editingErrors.length > 0}
        />
      </ButtonGroup>
    );

    const addon = (
      <Button margin="0.5xt" disabled={saving} onClick={this.onCancelClick} theme="link">
        {cancelLabel}
      </Button>
    );

    return (
      <div className={this.renderClassName()} style={this.renderStyles()}>
        <Form
          nativeForm
          onChange={({ newValue }) => this.onEditingValueChange(newValue)}
          disabled={saving}
        >
          <FormItem
            suffix={suffix}
            type="text"
            value={editingValue}
            name="newValue"
            controlRef={this.setEditControlRef}
            addon={addon}
          />
        </Form>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    const { editing } = this.state;

    const isCopyable = this.props.copyable;
    const value = this.props.value;
    const setSorted = (direction) => {
      this.setState({ sorted: direction });
    };

    // If copyable and/or bold is requested, wrap the content
    const content = isCopyable ? <Copyable>{value}</Copyable> : value;
    const noContent = isUndefined(content);

    // This is a wrapper around the sepcified sort callback which
    // injects the requested direction as a parameter to the original
    // callback
    const onSort = this.props.onSort
      ? direction => () => {
        const result = this.props.onSort(direction);

        // Check if the result is a promise. If so, wait for it to be fulfilled
        // before updating the internal state.
        if (isPromise(result)) {
          result.then(() => setSorted(direction));
        } else {
          setSorted(direction);
        }
      }
      : null;

    // Build the icon if specified
    const icon = this.props.icon
      ? <Icon name={this.props.icon} noMargin={noContent} />
      : null;

    // Build the cells styles


    // If onSort is defined, a suffix should be added
    const suffix = typeof onSort === 'function'
      ? (
        <div
          className={classnames('ui-table-cell-suffix', 'ui-table-sort', {
            'ui-table-sort-asc': this.state.sorted === 1,
            'ui-table-sort-desc': this.state.sorted === -1,
          })}
        >
          <Icon name="caret-up" onClick={onSort(1)} />
          <Icon name="caret-down" onClick={onSort(-1)} />
        </div>
      )
      : null;

    if (editing) {
      return this.renderEditingCell();
    }

    return (
      <div
        className={this.renderClassName()}
        style={this.renderStyles()}
        onClick={this.onCellClick}
        tabIndex={0}
      >
        {title && (
          <div className="ui-table-cell-title">
            {title}
          </div>
        )}
        <div className="ui-table-cell-content">
          <span className="ui-table-cell-text">
            {icon}
            {content}
          </span>
          {suffix}
        </div>
      </div>
    );
  }
}

export default TableCell;
