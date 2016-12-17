import React from 'react';

const Copyable = (props) => {
  const value = String(props.children);
  const children = props.children;
  const copy = () => {
    const aux = document.createElement('input');
    aux.style.position = 'fixed';
    aux.style.top = 0;
    aux.setAttribute('value', value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
  };

  return (
    <span className="ui-copyable">
      <span className="ui-copyable-text" onClick={copy}>
        {children}
      </span>
    </span>
  );
};

Copyable.propTypes = {
  children: React.PropTypes.node,
};

Copyable.defaultProps = {
};

export default Copyable;
