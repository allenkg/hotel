import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
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
  const { classes, activeFilters, setFilter } = props;
  let initialSearchTxt = "";
  const [searchTxt, setSearchTxt] = useState(initialSearchTxt);

  const handleChangeSearchTtx = (e) => {
    let searchQuery = e.target.value;
    activeFilters.searchQuery = searchQuery;
    setFilter(activeFilters);
    setSearchTxt(searchQuery);
    props.searchHandler();
  };

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
  classes: PropTypes.object.isRequired,
  activeFilters: PropTypes.object,
  setFilter: PropTypes.func,
};

export default withStyles(styles)(SearchBox)

