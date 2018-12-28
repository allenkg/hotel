import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel, Divider, Typography } from '@material-ui/core';
import StarRatings from 'react-star-ratings';


const FilterPanel = ({ sortBy, resetFilters, setFilter, filterQty, activeFilters }) => {
  const [star, setStar] = useState(1);
  const [hasPool, setPool] = useState(false);

  const setActiveFilters = (value, filterKey) => {
    activeFilters[filterKey] = value;
    setFilter(activeFilters);
  };

  const filterByStarHandler = (newRating, name) => {
    setActiveFilters(newRating, 'star');
    setStar(newRating);
    sortBy();
  };

  const handleChange = name => event => {
    let checked = event.target.checked;
    if (checked)
      setActiveFilters(checked, 'pool');
    else {
      setActiveFilters(null, 'pool');
    }
    setPool(checked);
    sortBy()
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
            value={'hasPool'}
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
  setFilter: PropTypes.func,
  filterQty: PropTypes.number,
  resetFilters: PropTypes.bool,
  activeFilters: PropTypes.object,
};

export const divider = (value) => (
  <div style={{padding: '10px'}}>
    <Divider variant={value}/>
  </div>
);

export default FilterPanel

