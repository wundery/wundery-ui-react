import React from 'react';

function AppIcon({ src }) {
  const style = {
    backgroundImage: `url('${src}')`,
  };

  return <div className="ui-app-icon" style={style} />;
}

AppIcon.propTypes = {
  src: React.PropTypes.string.isRequired,
};

export default AppIcon;
