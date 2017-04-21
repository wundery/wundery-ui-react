import React, { Component } from 'react';
import classnames from 'classnames';
import { has, get } from 'lodash';
import { isPromise, move } from '../../utils';
import TableRow from './TableRow';
import TableColumn from './TableColumn';
import { Pagination } from '../Pagination';
import { Spinner } from '../Spinner';
import { Button, ButtonGroup } from '../Button';
import { Icon } from '../Icon';
import { spacingStyles } from '../Spacing/utils';

class Table extends Component {

  static propTypes = {
    children: React.PropTypes.node,

    // If this prop is specified, the rows will be inserted at the indexes
    // represented by the prop keys. Use the key -1 to append lines
    // at the end. Example:
    //
    // {
    //   3: <TableRow ... />,
    //   5: [<TableRow ... />, <TableRow ... />],
    //   -1: <TableRow ... />,
    // }
    //
    // This inserts one row after index 3, two after index 5 and one at the end.
    customRows: React.PropTypes.object,

    // The actual data which is displayed
    data: React.PropTypes.array.isRequired,

    // This adds just a class to the table. It says that the table is embedded
    // into something, e.g. a box. It then can react on that and adjust the style
    // for example.
    embedded: React.PropTypes.bool,

    // Something which is displayed in the table footer
    footer: React.PropTypes.node,

    // A function which return if a given row is highlighted
    highlighted: React.PropTypes.func,

    // Specifies if the table is in loading mode
    loading: React.PropTypes.bool,

    onPageSizeChange: React.PropTypes.func,
    onPaginate: React.PropTypes.func,
    page: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    pages: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    pageSize: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]),
    pageSizes: React.PropTypes.array,
    prefix: React.PropTypes.node,
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
    addonBuilder: React.PropTypes.func,
    noHeader: React.PropTypes.bool,

    // If specified, the table columns are orderable by the user.
    // On drag release this callback is invoked and receives the an array containing
    // the objects in the new order.
    onOrder: React.PropTypes.func,

    // If this is specified the table is assumed to be mass-selectable.
    // For that a column is injected which contains a checkbox.
    onSelect: React.PropTypes.func,

    // If true, an onRowClickHandler will be set automatically, that selects
    // the clicked row.
    selectOnRowClick: React.PropTypes.bool,

    // A function which returns if a specific datum is selected
    isSelected: React.PropTypes.func,

    margin: React.PropTypes.string,
    error: React.PropTypes.node,
    emptyBody: React.PropTypes.func,

    // If defined, the table rows are expandable
    onExpand: React.PropTypes.func,

    /**
     * Triggered when a datum was updated by the table. Us this to update the data
     * prop and trigger a re-render.
     */
    onUpdate: React.PropTypes.func,

    /**
     * If specified, this is used to validate inline-edit data.
     */
    onValidate: React.PropTypes.func,

    cancelLabel: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    data: [],
    onExpand: null,
    onOrder: null,
    onUpdate: null,
    onValidate: null,
    cancelLabel: 'Cancel',
  };

  constructor(props) {
    super(props);

    this.renderPagination = this.renderPagination.bind(this);
    this.renderHeaderRow = this.renderHeaderRow.bind(this);
    this.renderDataRows = this.renderDataRows.bind(this);
    this.renderSelectColumn = this.renderSelectColumn.bind(this);
    this.renderPageSizes = this.renderPageSizes.bind(this);
    this.renderPrefix = this.renderPrefix.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderColumns = this.renderColumns.bind(this);

    this.state = {
      // If the onPaginate callback returns a promise. this flag will be set to
      // true during promise fulfillment
      paginating: false,

      // Expaned rows
      expansions: {},

      // Expansion in progress
      expanding: [],
    };
  }

  // Handles the actual selection of a row
  onSelectRow(event, datum) {
    const { onSelect } = this.props;

    if (onSelect) {
      return onSelect(datum);
    }

    return null;
  }

  onUpdateDatum = (prevDatum, nextDatum) => {
    const { onUpdate } = this.props;

    if (onUpdate) {
      onUpdate(prevDatum, nextDatum);
    }
  }

  onExpandClick = (datum) => {
    const { onExpand } = this.props;

    const index = this.getExpansionIndex(datum);

    if (this.isExpanding(index)) {
      return;
    }

    if (this.isExpanded(index)) {
      const newExpansions = { ...this.state.expansions };
      delete newExpansions[index];
      this.setState({ expansions: newExpansions });
    } else {
      const result = onExpand(datum);

      if (isPromise(result)) {
        // Set expanding
        this.setState(state => ({
          expanding: state.expanding.concat(index),
        }));

        result.then((content) => {
          this.setState(state => ({
            expanding: state.expanding.filter(i => i !== index),
            expansions: { ...state.expansions, [index]: content },
          }));
        });
      }
    }
  }

  onPageSizeChange = (nextPageSize) => {
    const { onPageSizeChange } = this.props;

    this.resetExpansion();

    onPageSizeChange(nextPageSize);
  }

  onMoveUpClick(datum) {
    this.resetExpansion();
    this.props.onOrder(this.moveDatum(datum, -1));
  }

  onMoveDownClick(datum) {
    this.resetExpansion();
    this.props.onOrder(this.moveDatum(datum, 1));
  }

  getExpansionIndex(datum) {
    if (!datum.id) {
      throw new Error('For expansion, data items nedd an id field');
    }

    return datum.id;
  }

  isSelectable() {
    return typeof this.props.onSelect === 'function';
  }

  isOrderable() {
    return typeof this.props.onOrder === 'function';
  }

  isExpanding(rowIndex) {
    return this.state.expanding.indexOf(rowIndex) > -1;
  }

  isExpanded(rowIndex) {
    return this.state.expansions[rowIndex];
  }

  isExpandable() {
    return typeof this.props.onExpand === 'function';
  }

  moveDatum(datum, modifier) {
    const { data } = this.props;

    const index = data.indexOf(datum);

    return move(data, index, index + modifier);
  }

  bodyRef = (ref) => {
    if (ref) {
      if (this.isOrderable()) {
        // Todo - intialite drag-drop-lib on ref
      }
    }
  }

  resetExpansion() {
    this.setState({ expansions: {}, expanding: [] });
  }

  renderHeaderRow(columns) {
    return (
      <TableRow
        key={-1}
        columns={columns}
        header
      />
    );
  }

  renderEmptyBody() {
    const { data, emptyBody } = this.props;

    if (data.length > 0) { return null; }

    return emptyBody && (
      <div className="ui-table-empty">
        {emptyBody()}
      </div>
    );
  }

  renderDataRows(columns) {
    const {
      addonBuilder,
      cancelLabel,
      highlighted,
      onSelect,
      onValidate,
      selectOnRowClick,
    } = this.props;

    const rows = this.props.data.map((datum, index) => {
      const isHighlighted = highlighted ? highlighted(datum) : false;
      const addon = addonBuilder ? addonBuilder(datum) : null;
      const onRowClick = onSelect && selectOnRowClick
        ? event => this.onSelectRow(event, datum)
        : null;

      const expansionIndex = this.isExpandable()
        ? this.getExpansionIndex(datum)
        : null;

      return (
        <TableRow
          addon={addon}
          cancelLabel={cancelLabel}
          columns={columns}
          datum={datum}
          expansion={this.state.expansions[expansionIndex]}
          highlighted={isHighlighted}
          index={index}
          key={index}
          onRowClick={onRowClick}
          onUpdateDatum={this.onUpdateDatum}
          onValidate={onValidate}
        />
      );
    });

    // Insert custom rows if specified
    const rowsWithCustomRows = [];
    const appendCustomRow = (target, row, index) => {
      [].concat(row).forEach((r, j) => target.push(<TableRow
        key={`${index}-${j}-custom`}
        {...r.props}
      />));
    };

    rows.forEach((row, i) => {
      if (has(this.props.customRows, i)) {
        appendCustomRow(rowsWithCustomRows, this.props.customRows[i], i);
      }
      rowsWithCustomRows.push(row);
    });

    if (has(this.props.customRows, -1)) {
      appendCustomRow(rowsWithCustomRows, this.props.customRows[-1], -1);
    }

    return (
      <div className={classnames('ui-table-body')} ref={this.bodyRef}>
        {rowsWithCustomRows}
      </div>
    );
  }

  renderSelectColumn() {
    const { isSelected } = this.props;

    // Using the onClick callback we prevent the onClick on the table rows
    // to be triggered when the checkbox is clicked.
    return (
      <TableColumn
        width={50}
        builder={(datum) => {
          const selected = isSelected ? isSelected(datum) : false;
          return (
            <input
              type="checkbox"
              checked={selected}
              onClick={event => event.stopPropagation()}
              onChange={event => this.onSelectRow(event, datum)}
            />
          );
        }}
      />
    );
  }

  renderOrderColumn() {
    return (
      <TableColumn
        width={100}
        title={<Icon name="arrows-v" />}
        builder={this.renderOrderCell}
        center
      />
    );
  }

  renderOrderCell = (datum, rowIndex) => {
    const { data } = this.props;
    const lastRowIndex = data.length - 1;

    return (
      <ButtonGroup>
        <Button
          icon="caret-up"
          disabled={rowIndex === 0}
          onClick={() => this.onMoveUpClick(datum)}
        />
        <Button
          icon="caret-down"
          disabled={rowIndex === lastRowIndex}
          onClick={() => this.onMoveDownClick(datum)}
        />
      </ButtonGroup>
    );
  }

  renderExpandColumn() {
    const builder = (datum) => {
      const onClick = () => this.onExpandClick(datum);

      const index = this.getExpansionIndex(datum);
      const isExpanding = this.isExpanding(index);
      const isExpanded = this.isExpanded(index);

      return (
        <div className="ui-table-row-expand-trigger" tabIndex={0} onClick={onClick}>
          {!isExpanding && !isExpanded && <Icon name="plus-square-o" />}
          {isExpanding && <Spinner />}
          {!isExpanding && isExpanded && <Icon name="minus-square-o" />}
        </div>
      );
    };

    return <TableColumn width={50} builder={builder} center expander />;
  }

  renderPagination() {
    const { pages, page, onPaginate } = this.props;
    const { paginating } = this.state;

    if (!onPaginate) {
      return null;
    }

    // If an onPaginate handler is given, build a wrapper that changes the
    // state
    const onPaginateWrapper = (p) => {
      this.setState({ expansions: {}, expanding: [], paginating: true }, () => {
        const result = this.props.onPaginate(p);

        // Check if the result is a promise. If so, wait for it to be
        // fulfilled before updating the internal state.
        if (isPromise(result)) {
          result.then(() => this.setState({ paginating: false }));
        } else {
          this.setState({ paginating: true });
        }
      });
    };

    return (
      <div className={classnames('ui-table-footer-pagination')}>
        <Pagination
          current={page}
          count={pages}
          disabled={paginating}
          onClick={onPaginateWrapper}
        />
      </div>
    );
  }

  // Filter only Table Columns.
  // If the table is mass selectable we inject a checkbox column
  renderColumns() {
    const columns = []
      .concat(this.props.children)
      .filter(child => get(child, 'type') === TableColumn);

    // Prepend the checkbox column
    if (this.isSelectable()) {
      columns.unshift(this.renderSelectColumn());
    }

    // Prepend the order column
    if (this.isOrderable()) {
      columns.unshift(this.renderOrderColumn());
    }

    // Prepend the order column
    if (this.isExpandable()) {
      columns.unshift(this.renderExpandColumn());
    }

    return columns;
  }

  renderPageSizes() {
    const { onPaginate, pageSizes, pageSize } = this.props;

    if (onPaginate && pageSizes) {
      return (
        <div className={classnames('ui-table-footer-page-sizes')}>
          {pageSizes.map((size, index) => (
            <a
              key={index}
              tabIndex={index}
              onClick={() => this.onPageSizeChange(size)}
              className={classnames('ui-table-footer-page-size', {
                'ui-table-footer-page-size-active': size === pageSize,
              })}
            >
              {size}
            </a>
          ))}
        </div>
      );
    }

    return null;
  }

  renderFooter() {
    const { footer } = this.props;
    const pagination = this.renderPagination();
    const pageSizes = this.renderPageSizes();

    if (pagination || pageSizes || footer) {
      return (
        <div className={classnames('ui-table-footer')}>
          {pagination}
          {pageSizes}
          {footer}
        </div>
      );
    }

    return null;
  }

  renderPrefix() {
    const { prefix } = this.props;

    if (prefix) {
      return (
        <div className={classnames('ui-table-prefix')}>
          {this.props.prefix}
        </div>
      );
    }

    return null;
  }

  renderHeader(columns) {
    const headerRow = this.renderHeaderRow(columns);

    if (this.props.noHeader) {
      return null;
    }

    return (
      <div className={classnames('ui-table-header')}>
        {headerRow}
      </div>
    );
  }

  renderTitle() {
    const { title } = this.props;

    return title && (
      <div className={classnames('ui-table-title')}>
        {title}
      </div>
    );
  }

  renderError() {
    const { error } = this.props;

    return error && (
      <div className="ui-table-errors">
        {error}
      </div>
    );
  }

  render() {
    const { loading, embedded, margin } = this.props;

    const columns = this.renderColumns();
    const style = spacingStyles({ margin });
    const tableClassName = classnames('ui-table-wrapper', {
      'ui-table-loading': loading,
      'ui-table-embedded': embedded,
    });

    return (
      <div className={tableClassName} style={style}>
        <div className={classnames('ui-table-overlay')}>
          <Spinner />
        </div>
        <div className={classnames('ui-table')}>
          {this.renderTitle()}
          {this.renderPrefix()}
          {this.renderHeader(columns)}
          {this.renderDataRows(columns)}
          {this.renderError()}
          {this.renderEmptyBody()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default Table;
