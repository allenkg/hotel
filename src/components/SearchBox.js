import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  search: {
    position: 'relative',
    width: '100%',
    right: 5
  },
  searchIcon: {
    width: theme.spacing.unit * 6,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'black',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 6,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      border: '1px solid #9898c8'
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '100%'
  },
});

const SearchBox = (props) => {
  const { classes, resetFilters } = props;
  let initialSearchTxt = "";
  const [searchTxt, setSearchTxt] = useState(initialSearchTxt);

  const handleChangeSearchTtx = (e) => {
    setSearchTxt(e.target.value);
    props.searchHandler(e.target.value, 'name');
  };

  useEffect(() => {
    if (resetFilters)
      setSearchTxt(initialSearchTxt);
  });

  return (
    <React.Fragment>
      <Typography component="h1" variant="title">
        Hotel Name
      </Typography>
      <div className={classes.search}>
        <TextField
          id="outlined-search"
          placeholder="Hotel Name"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChangeSearchTtx}
          value={searchTxt}
          InputProps={{
            startAdornment: <SearchIcon/>,
          }}
        />
      </div>

    </React.Fragment>
  )
};

SearchBox.PropTypes = {
  searchHandler: PropTypes.func,
  resetFilters: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBox)

