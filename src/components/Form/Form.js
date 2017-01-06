import React from 'react';
import classnames from 'classnames';
import { size, set, get, filter, isUndefined, isNull, isArray, isString } from 'lodash';
import { FormItem } from '../Form';
import { spacingStyles } from '../Spacing/utils';

function Form(props) {
  const {
    children,
    compact,
    data,
    disabled,
    errors,
    inline,
    margin,
    nativeForm,
    onChange,
    pristine,
    requiredText,
  } = props;

  let i = 0;
  let formItemIndex = 0;

  /**
   * Called everytime the value of an form item changes
   *
   * @param name {string} - The field name
   * @param value {any} - The new field value
   */
  const onItemValueChanged = (name, value) => {
    // Attribute names can be dot-separated, this is why we use lodash set
    const newData = set({ ...data }, name, value);
    onChange(newData);
  };

  /**
   * Filters all errors for a specific field
   *
   * @param allErrors {Array<Object>} - An array of errors
   * @param name {string} - The field name
   */
  const getItemErrors = (allErrors, name) => allErrors
    .filter(error => error.field === name);

  const filterNullChilds = child => !isUndefined(child) && !isNull(child);

  /**
   * Recursively traverses the specified children and updates all those
   * of type FormItem.
   */
  const searchAndUpdateFormItems = (childs) => {
    if (size(childs) === 0) {
      return childs;
    }

    return filter(childs, filterNullChilds).map((child) => {
      i += 1;

      if (isString(child)) {
        return child;
      }

      if (isArray(child)) {
        return searchAndUpdateFormItems(child);
      }

      const { props: childProps, type: ChildType } = child;

      if (ChildType === FormItem) {
        formItemIndex += 1;

        const attributeName = child.props.name;
        const newChildProps = Object.assign({}, childProps, {
          onChange: value => onItemValueChanged(attributeName, value),
          errors: getItemErrors(errors, attributeName),
          pristine,
          disabled,
          requiredText,
          compact,
          inline,
        });

        // Attribute names can be dot-separated, this is why we use lodash get
        const value = get(data, attributeName, '');

        return <FormItem key={i} tabIndex={formItemIndex} value={value} {...newChildProps} />;
      }

      const newChildren = searchAndUpdateFormItems(
        [].concat(get(childProps, 'children', []))
      );

      return ChildType
        ? <ChildType key={i} {...{ ...child.props, children: newChildren }} />
        : child;
    });
  };

  // Get the errors which are not specific for certain fields
  const formErrors = errors.length > 0 && (
    <div className={classnames('ui-form-errors')}>
      {getItemErrors(errors, null).map((error, index) => (
        <div key={index} className={classnames('ui-form-error')}>
          {error.message}
        </div>
      ))}
    </div>
  );

  const style = spacingStyles({ margin });
  const className = classnames('ui-form', {
    'ui-form-inline': inline,
  });

  const WrapperType = nativeForm ? 'form' : 'div';

  return (
    <WrapperType className={className} style={style}>
      {searchAndUpdateFormItems([].concat(children))}
      {formErrors}
    </WrapperType>
  );
}

Form.propTypes = {
  // Called on FormItem value updates
  onChange: React.PropTypes.func,

  // Special presentation mode
  compact: React.PropTypes.bool.isRequired,

  // If specified, all FormItems will be disabled.
  disabled: React.PropTypes.bool,

  // The required text for all FormItems
  requiredText: React.PropTypes.string,

  // Object, containing the form data
  data: React.PropTypes.object,

  // Array containing errors
  errors: React.PropTypes.array.isRequired,

  // Can be anything. FormItem's will be updated.
  children: React.PropTypes.node,

  // If specified, overrides the pristine state of the form items
  pristine: React.PropTypes.bool,

  // Adds top margin
  margin: React.PropTypes.string,

  // Whether the form should be rendered inline
  inline: React.PropTypes.bool,

  // If true, a native form element will be used as wrapper
  nativeForm: React.PropTypes.bool,
};

Form.defaultProps = {
  compact: false,
  data: {},
  disabled: false,
  errors: [],
  nativeForm: false,
  pristine: true,
};

export default Form;
