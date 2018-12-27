import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel, Divider, Typography } from '@material-ui/core';
import StarRatings from 'react-star-ratings';


const FilterPanel = ({ sortBy, resetFilters }) => {
  const [star, setStar] = useState(1);
  const [hasPool, setPool] = useState(false);

  const filterByStarHandler = (newRating, name) => {
    setStar(newRating);
    sortBy(newRating, 'rate')
  };

  const handleChange = name => event => {
    setPool(event.target.checked);
    sortBy(event.target.checked, 'hasPool')
  };

  useEffect(() => {
    if (resetFilters) {
      setStar(1);
      setPool(false)
    }
  });


  return (
    <React.Fragment>
      <Typography component="h1" variant="title">
        Stars
      </Typography>
      <div className="star-rate">
        <StarRatings
          rating={star}
          starRatedColor="blue"
          starHoverColor="blue"
          changeRating={filterByStarHandler}
          numberOfStars={5}
          starDimension="40px"
          name='rating'
        />
      </div>
      {divider('fullWidth')}
      <Typography component="h1" variant="title">
        Options
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={hasPool}
            onChange={handleChange('hasPool')}
            value={hasPool}
            color="primary"
          />
        }
        label="Swimming pool"
      />
      {divider('fullWidth')}
    </React.Fragment>
  )
};

FilterPanel.propTypes = {
  sortBy: PropTypes.func,
  resetFilters: PropTypes.bool,
};

export const divider = (value) => (
  <div style={{padding: '10px'}}>
    <Divider variant={value}/>
  </div>
);

export default FilterPanel

