import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Hotels = (props) => {
  const { hotels } = props;
  return (
    <div>
      { props.children }
    </div>
  );
};

export default Hotels;