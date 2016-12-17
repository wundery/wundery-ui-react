import { FormValidation } from '../../../../src';

describe('FormValidation', () => {
  let validation = null;
  let messageFunc = (field, validationName) => `Error in ${field}: ${validationName}`;
  const customMessageFunc = () => 'foo';

  beforeEach(() => {
    validation = new FormValidation(messageFunc)
      .validate('wooza', 'required')
      .validate('fooza', ['required', 'posMoney'])
      .validate('pooza', 'required', customMessageFunc)
      .validate('mooza', { minLength: 1337 });
  });

  it('allows chaining of validation rules', () => {
    const result = validation.validate('title', 'required');

    expect(result).toBeInstanceOf(FormValidation);
  });

  it('stores the validation rules correctly', () => {
    expect(validation.stack).toEqual([
      {
        field: 'wooza',
        validations: ['required'],
        messageFunc,
      },
      {
        field: 'fooza',
        validations: ['required', 'posMoney'],
        messageFunc,
      },
      {
        field: 'pooza',
        validations: ['required'],
        messageFunc: customMessageFunc,
      },
      {
        field: 'mooza',
        validations: [{ minLength: 1337 }],
        messageFunc,
      },
    ]);
  });

  describe('run', () => {
    it('returns an array of errors', () => {
      const result = validation.run({});

      expect(result).toBeInstanceOf(Array);
    });

    it('returns the correct errors', () => {
      const result = validation.run({});

      expect(result).toEqual([
        {
          field: 'wooza',
          message: messageFunc('wooza', 'required'),
        },
        {
          field: 'fooza',
          message: messageFunc('fooza', 'required'),
        },
        {
          field: 'pooza',
          message: customMessageFunc('pooza', 'required'),
        },
        {
          field: 'mooza',
          message: messageFunc('mooza', 'minLength'),
        },
      ]);
    });
  });

  describe('dependent rules', () => {
    beforeEach(() => {
      messageFunc = (fieldName, validationName) => validationName;
      validation = new FormValidation()
        .validate('price', ['required', 'posMoney'], messageFunc);
    });

    it('will not run posMoney when required fails', () => {
      const result = validation.run({ price: null });

      expect(result.length).toEqual(1);
      expect(result[0].message).toEqual('required');
    });

    it('will run posMoney when required passes', () => {
      const result = validation.run({ price: 'abc' });

      expect(result.length).toEqual(1);
      expect(result[0].message).toEqual('posMoney');
    });
  });

  describe('rules', () => {
    describe('required', () => {
      beforeEach(() => {
        validation = new FormValidation().validate('title', 'required');
      });

      it('passes when a value exists', () => {
        const result = validation.run({ title: 'Luke Skywalker' });

        expect(result).toEqual([]);
      });

      it('passes when the value is false', () => {
        const result = validation.run({ title: false });

        expect(result).toEqual([]);
      });

      it('fails when the value is spaces only', () => {
        const result = validation.run({ title: '   ' });

        expect(result.length).toEqual(1);
      });

      it('fails when the value is an empty string', () => {
        const result = validation.run({ title: '' });

        expect(result.length).toEqual(1);
      });

      it('fails when the value is null', () => {
        const result = validation.run({ title: null });

        expect(result.length).toEqual(1);
      });

      it('fails when the key is not in the data', () => {
        const result = validation.run({ mops: 1337 });

        expect(result.length).toEqual(1);
      });
    });
  });

  describe('equal', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('password', {
        equal: 'password_confirmation',
      });
    });

    it('passes if the value equals the value of the specified key', () => {
      const result = validation.run({
        password: 'secret',
        password_confirmation: 'secret',
      });

      expect(result).toEqual([]);
    });

    ['Secret', 'secret ', ' secret', null, ''].forEach((value) => {
      it(`fails for ${value}`, () => {
        const result = validation.run({
          password: value,
          password_confirmation: 'secret',
        });

        expect(result.length).toEqual(1);
      });
    });
  });

  describe('creditCardNumber', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('number', 'creditCardNumber');
    });

    ['4242 4242 4242 4242'].forEach((number) => {
      it(`passes for ${number}`, () => {
        const result = validation.run({ number });

        expect(result).toEqual([]);
      });
    });

    ['mops', '123', '12123321'].forEach((number) => {
      it(`fails for ${number}`, () => {
        const result = validation.run({ number });

        expect(result.length).toEqual(1);
      });
    });
  });

  describe('creditCardExpYear', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('year', 'creditCardExpYear');
    });

    ['2018', String(new Date().getFullYear()), '2050'].forEach((year) => {
      it(`passes for ${year}`, () => {
        const result = validation.run({ year });

        expect(result).toEqual([]);
      });
    });

    ['20', '300', '2015'].forEach((year) => {
      it(`fails for ${year}`, () => {
        const result = validation.run({ year });

        expect(result.length).toEqual(1);
      });
    });
  });

  describe('creditCardExpMonth', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('month', 'creditCardExpMonth');
    });

    ['1', '01', '12'].forEach((month) => {
      it(`passes for ${month}`, () => {
        const result = validation.run({ month });

        expect(result).toEqual([]);
      });
    });

    ['0', '13', '122'].forEach((month) => {
      it(`fails for ${month}`, () => {
        const result = validation.run({ month });

        expect(result.length).toEqual(1);
      });
    });
  });

  describe('email', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('private_mail', 'email');
    });

    it('passes when a value exists and is an email', () => {
      const result = validation.run({ private_mail: 'luke@skywalker.de' });

      expect(result).toEqual([]);
    });

    it('passes when the value is empty', () => {
      const result = validation.run({ private_mail: '' });

      expect(result).toEqual([]);
    });

    it('passes when the value is null', () => {
      const result = validation.run({ private_mail: null });

      expect(result).toEqual([]);
    });

    it('fails when the value is not an email', () => {
      const result = validation.run({ private_mail: 'mops@' });

      expect(result.length).toEqual(1);
    });
  });

  describe('email', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('countries', 'nonEmptyArray');
    });

    it('passes when the value contains at least one value', () => {
      const result = validation.run({ countries: ['foo'] });

      expect(result).toEqual([]);
    });

    it('fails when the array is empty', () => {
      const result = validation.run({ countries: [] });

      expect(result.length).toEqual(1);
    });

    it('fails when the value is null', () => {
      const result = validation.run({ countries: null });

      expect(result.length).toEqual(1);
    });

    it('fails when the value is not an array', () => {
      const result = validation.run({ countries: 'mops@' });

      expect(result.length).toEqual(1);
    });
  });

  describe('domainWithSubdomain', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('main_domain', 'domainWithSubdomain');
    });

    it('passes when a value exists and is a domain with subdomain', () => {
      const result = validation.run({ main_domain: 'www.skywalker.de' });

      expect(result).toEqual([]);
    });

    it('passes when the value is empty', () => {
      const result = validation.run({ main_domain: '' });

      expect(result).toEqual([]);
    });

    it('passes when the value is null', () => {
      const result = validation.run({ main_domain: null });

      expect(result).toEqual([]);
    });

    it('fails when the value is not a full domain w/ subdomain', () => {
      const result = validation.run({ main_domain: 'skywalker.de' });

      expect(result.length).toEqual(1);
    });

    it('fails when the value is invalid', () => {
      const result = validation.run({ main_domain: '.skywalker' });

      expect(result.length).toEqual(1);
    });
  });

  describe('minLength', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('password', { minLength: 5 });
    });

    it('passes when the minlength is reached', () => {
      const result = validation.run({ password: '12345' });

      expect(result).toEqual([]);
    });

    it('fails when the minlength is not reached', () => {
      const result = validation.run({ password: '1234' });

      expect(result.length).toEqual(1);
    });

    it('fails when the value is null', () => {
      const result = validation.run({ password: null });

      expect(result.length).toEqual(1);
    });

    it('fails when the value is not in the data', () => {
      const result = validation.run({ mops: null });

      expect(result.length).toEqual(1);
    });
  });

  describe('maxLength', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('username', { maxLength: 5 });
    });

    it('passes when the maxlength is reached', () => {
      const result = validation.run({ username: '12345' });

      expect(result).toEqual([]);
    });

    it('passes when the value is not in the data', () => {
      const result = validation.run({ mops: null });

      expect(result).toEqual([]);
    });

    it('passes when the value is null', () => {
      const result = validation.run({ username: null });

      expect(result).toEqual([]);
    });

    it('fails when the maxlength is not exceeded', () => {
      const result = validation.run({ username: '123456' });

      expect(result.length).toEqual(1);
    });
  });

  describe('goodPassword', () => {
    beforeEach(() => {
      validation = new FormValidation().validate('password', 'goodPassword');
    });

    it('passes when the password is good', () => {
      const result = validation.run({ password: 'abcd123___' });

      expect(result).toEqual([]);
    });

    it('fails when the password is bad', () => {
      const result = validation.run({ password: 'abc' });

      expect(result.length).toEqual(1);
    });

    it('fails when the password is null', () => {
      const result = validation.run({ password: null });

      expect(result.length).toEqual(1);
    });

    it('fails when the password is not in the data', () => {
      const result = validation.run({ mops: null });

      expect(result.length).toEqual(1);
    });
  });

  ['posDecimal', 'weight', 'posMoney'].forEach((validationName) => {
    describe(validationName, () => {
      beforeEach(() => {
        validation = new FormValidation().validate('value', validationName);
      });

      ['5.1', '5,1', '5', 5, 5.0, 5.1, 5.1338, 0.4, '0.45'].forEach((value) => {
        it(`passes for ${value}`, () => {
          const result = validation.run({ value });

          expect(result).toEqual([]);
        });
      });

      ['abc', '1a', '1.6€', -5, '-5', '-5.69'].forEach((value) => {
        it(`fails for ${value}`, () => {
          const result = validation.run({ value });

          expect(result.length).toEqual(1);
        });
      });
    });
  });

  it('raises an error for an invalid validation', () => {
    validation = new FormValidation().validate('name', 'mopsFops');

    expect(() => {
      validation.run({});
    }).toThrow();
  });
});
