import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

const HotelRaiting = ({rate}) => {

  return (
    <StarRatings
      rating={rate}
      starDimension="20px"
    />
  );
}

HotelRaiting.propTypes = {
  rate: PropTypes.number.isRequired
}

export default HotelRaiting;