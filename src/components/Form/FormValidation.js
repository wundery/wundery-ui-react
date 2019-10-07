import {
  get,
  has,
  isArray,
  isEmpty,
  isNull,
  isObject,
  isPlainObject,
  keys,
  parseInt,
  trim,
} from 'lodash';

class FormValidation {

  static isCreditCard(number) {
    let bEven;
    let cDigit;
    let n;
    let nCheck;
    let nDigit;
    let value = number;

    if (/[^0-9-\s]+/.test(value)) {
      return false;
    }

    // The Luhn Algorithm. It's so pretty.

    nCheck = 0;
    nDigit = 0;
    bEven = false;
    value = value.replace(/\D/g, '');
    n = value.length - 1;

    while (n >= 0) {
      cDigit = value.charAt(n);
      nDigit = parseInt(cDigit, 10);
      if (bEven) {
        const mu = nDigit *= 2;
        if ((mu) > 9) {
          nDigit -= 9;
        }
      }
      nCheck += nDigit;
      bEven = !bEven;
      n -= 1;
    }

    return nCheck % 10 === 0;
  }

  static isValidExpYear(value) {
    return parseInt(String(value)) >= new Date().getFullYear();
  }

  static isValidExpMonth(value) {
    const intValue = parseInt(String(value));
    return intValue >= 1 && intValue <= 12;
  }

  constructor(messageFunc) {
    this.stack = [];
    this.messageFunc = messageFunc;
  }

  validate(field, validationOrValidations, messageFunc = null) {
    this.stack.push({
      field,
      validations: [].concat(validationOrValidations),
      messageFunc: messageFunc || this.messageFunc,
    });

    return this;
  }

  run(data = {}) {
    const errors = [];

    this.stack.forEach((definition) => {
      definition.validations.every((validation) => {
        const errorMessage = this.getErrorMessage(
          validation,
          definition.field,
          data,
          definition.messageFunc
        );
        if (errorMessage) {
          errors.push({
            field: definition.field,
            message: errorMessage,
          });
        }
        return isNull(errorMessage);
      });
    });
    return errors;
  }

  getErrorMessage(validation, field, data, messageFunc = null) {
    const name = isObject(validation) ? keys(validation)[0] : validation;
    let error = null;
    const value = get(data, field);
    const hasField = has(data, field);

    switch (name) {
      case 'required':
        error = (!hasField || value === '' || isEmpty(trim(value)));
        break;

      case 'email':
        error = hasField && value && !String(value).match(/.+@.+/);
        break;

      case 'creditCardNumber':
        error = hasField && value && !FormValidation.isCreditCard(value);
        break;

      case 'creditCardExpYear':
        error = hasField && value && !FormValidation.isValidExpYear(value);
        break;

      case 'creditCardExpMonth':
        error = hasField && value && !FormValidation.isValidExpMonth(value);
        break;

      case 'hasKeys':
        error = hasField && value && !(isPlainObject(value) || keys(value).length === 0);
        break;

      case 'domainWithSubdomain':
        error = hasField
          && value
          && !String(value).match(/^[a-z0-9-]+\.[a-z0-9-]+\.[a-z]{2,10}$/);
        break;

      case 'regex':
        error = hasField
          && value
          && !String(value).match(validation[name]);
        break;

      case 'equal':
        error = value !== get(data, validation[name]);
        break;

      case 'minLength':
        error = !hasField || !value || (hasField && value.length < validation[name]);
        break;

      case 'maxLength':
        error = hasField && value !== null && value.length > validation[name];
        break;

      case 'goodPassword':
        error = !hasField || (hasField &&
          !String(value).match(/^(?=.*[0-9])(?=.*[a-z]).{6,}$/));
        break;

      case 'posDecimal':
      case 'weight':
        error = hasField && value && !String(value).match(/^[0-9,.]+$/);
        break;

      case 'posMoney':
        error = hasField && value && !String(value).match(/^[0-9,.]+$/);
        break;

      case 'posInteger':
        error = hasField && value && !String(value).match(/^[0-9]*$/);
        break;

      case 'iban':
        error = hasField && value && !String(value).match(
          /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/
        );
        break;

      case 'nonEmptyArray':
        error = !hasField || !isArray(value) || value.length === 0;
        break;

      case 'hourRange':
        error = hasField && value && !String(value).match(/^\d+-\d+$|^\d+$/);
        break;

      case 'isURL':
          error = hasField && value && !String(value).match(/^(http(s)?:\/\/)?[a-z0-9-]+\.[a-z0-9-]+\.[a-z]{2,10}$/)
        break;

      default:
        throw new Error(`Unknown validation ${JSON.stringify(validation)}`);
    }

    if (error) {
      const genericMessage = `Validation failed: ${name}`;
      return messageFunc
        ? messageFunc(field, name) || genericMessage
        : genericMessage;
    }

    return null;
  }
}

export default FormValidation;
