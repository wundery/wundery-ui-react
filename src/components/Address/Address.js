import React from 'react';
import classnames from 'classnames';
import { Text } from '../Text';

const Address = (props) => {
  const lines = [];
  const primaryDetails = [];
  const locationDetails = [];
  const countryDetails = [];
  const contactDetails = [];

  if (props.company) {
    primaryDetails.push(
      <span className="ui-address-element ui-address-company" key="company">
        {props.company}
      </span>
    );
  }

  if (props.first_name || props.last_name) {
    primaryDetails.push(
      <span className="ui-address-element ui-address-name" key="name">
        {[props.first_name, props.last_name].join(' ')}
      </span>
    );
  }

  if (primaryDetails.length > 0) {
    lines.push(
      <div className="ui-address-line ui-address-primary-details" key="prim">
        {primaryDetails}
      </div>
    );
  }

  if (props.street || props.street_no) {
    locationDetails.push(
      <span className="ui-address-element ui-address-street" key="street">
        {[props.street, props.street_no].join(' ')}
      </span>
    );
  }

  if (props.zip || props.city) {
    locationDetails.push(
      <span className="ui-address-element ui-address-city" key="city">
        {[props.zip, props.city].join(' ')}
      </span>
    );
  }

  if (locationDetails.length > 0) {
    lines.push(
      <div className="ui-address-line ui-address-location-details" key="loc">
        {locationDetails}
      </div>
    );
  }

  if (props.country) {
    countryDetails.push(
      <span className="ui-address-element ui-address-country" key="country">
        {props.country}
      </span>
    );
  }

  if (countryDetails.length > 0) {
    lines.push(
      <div className="ui-address-line ui-address-country-details" key="coun">
        {countryDetails}
      </div>
    );
  }

  if (props.email) {
    contactDetails.push(
      <span className="ui-address-element ui-address-email" key="email">
        <a href={`mailto:${props.email}`}>
          {props.email}
        </a>
      </span>
    );
  }

  if (props.phone) {
    contactDetails.push(
      <span className="ui-address-element ui-address-phone" key="phone">
        <Text muted>Fon:</Text> <a href={`tel:${props.phone}`}>
          {props.phone}
        </a>
      </span>
    );
  }

  if (props.fax) {
    contactDetails.push(
      <span className="ui-address-element ui-address-fax" key="fax">
        <Text muted>Fax:</Text> {props.fax}
      </span>
    );
  }

  if (contactDetails.length > 0) {
    lines.push(
      <div className="ui-address-line ui-address-contact-details" key="cond">
        {contactDetails}
      </div>
    );
  }

  return (
    <div
      className={classnames('ui-address', {
        'ui-address-compact': props.compact,
      })}
    >
      {lines}
    </div>
  );
};

Address.propTypes = {
  company: React.PropTypes.string,
  first_name: React.PropTypes.string,
  last_name: React.PropTypes.string,
  street: React.PropTypes.string,
  street_no: React.PropTypes.string,
  city: React.PropTypes.string,
  zip: React.PropTypes.string,
  country: React.PropTypes.node,
  phone: React.PropTypes.string,
  fax: React.PropTypes.string,
  email: React.PropTypes.string,
  compact: React.PropTypes.bool,
};

export default Address;
