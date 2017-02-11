import React from 'react';
import { Example, ExampleSet } from 'components';
import { tableData } from 'utils';
import { Table, TableColumn } from 'wundery-ui-react/components/Table';
import { FormValidation } from 'wundery-ui-react/components/Form';

class TableExamples extends React.Component {

  constructor(props) {
    super(props);

    /**
     * Validator for editable table
     *
     * @type {FormValidation}
     */
    this.validation = new FormValidation().validate('price', 'required');

    /**
     * Initial container state
     *
     * @type {Object}
     */
    this.state = {
      expandableTableData: tableData(3),
      expandableTablePage: 1,
      expandableTablePageSize: 3,
      editableTableData: tableData(3),
    };
  }

  onUpdate = (prevDatum, nextDatum) => {
    console.log('received update', prevDatum, nextDatum);

    const { editableTableData } = this.state;

    const newData = [...editableTableData];

    newData[editableTableData.indexOf(prevDatum)] = nextDatum;

    this.setState({
      editableTableData: newData,
    });
  }

  onValidate = (data) => {
    return this.validation.run(data);
  }

  renderEditableExample() {
    return (
      <Example title="Table with inline edit support">
        <Table
          data={this.state.editableTableData}
          onUpdate={this.onUpdate}
          onValidate={this.onValidate}
        >
          <TableColumn
            title="ID"
            attribute="id"
            width={60}
            copyable
            center
          />
          <TableColumn
            title="Product title"
            attribute="title"
          />
          <TableColumn
            width={200}
            title="Price"
            editable="price"
            onEdit={datum => {
              console.log('Updating datum...', datum);

              return new Promise(resolve => setTimeout(() => resolve(datum), 500));
            }}
            builder={datum => {
              return (
                <div>
                  <div><strong>{datum.price_formatted}</strong></div>
                  <div>floatVal = {datum.price}</div>
                </div>
              );
            }}
          />
        </Table>
      </Example>
    );
  }

  renderDefaultExample() {
    return (
      <Example title="Default table">
        <Table title="This is the table title"data={tableData(3)}>
          <TableColumn
            title="ID"
            attribute="id"
            width={60}
            copyable
            center
          />
          <TableColumn
            title="Product title"
            attribute="title"
          />
        </Table>
      </Example>
    );
  }

  // If provided, this is called and renderd when the user expands a row
  onExpandClick = (datum) => {
    const content = (
      <span>
        Expanded content for {datum.id}
      </span>
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(content), 500);
    })
  };

  onPaginate = (page) => this.setState({
    expandableTableData: tableData(this.state.expandableTablePageSize, page),
    expandableTablePage: page,
  });

  onPageSizeChange = (pageSize) => this.setState({
    expandableTablePageSize: pageSize,
    expandableTableData: tableData(pageSize),
  });

  renderExpandableExample() {
    return (
      <Example title="Expandable table with pagination">
        <Table
          data={this.state.expandableTableData}
          onExpand={this.onExpandClick}
          pages={2}
          pageSizes={[3, 6]}
          pageSize={this.state.expandableTablePageSize}
          page={this.state.expandableTablePage}
          onPaginate={this.onPaginate}
          onPageSizeChange={this.onPageSizeChange}
        >
          <TableColumn
            title="ID"
            attribute="id"
            width={60}
            copyable
            center
          />
          <TableColumn
            title="Product title"
            attribute="title"
          />
        </Table>
      </Example>
    );
  }

  render() {
    return (
      <ExampleSet title="Tables">
        {this.renderDefaultExample()}
        {this.renderExpandableExample()}
        {this.renderEditableExample()}
      </ExampleSet>
    );
  }
}

export default TableExamples;
