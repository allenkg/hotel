import React from 'react';
import PropTypes from 'prop-types';
import FilterPanel from './FilterPanel';
import SearchBox from './SearchBox';
import Hotels from './Hotels';
import HotelCard from './HotelCard';
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline, CircularProgress, Grid, AppBar, Divider,
  Drawer, Hidden, IconButton, Toolbar, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const drawerWidth = 340;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      mobileOpen: false,
      hasFiltered: false,
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    activeFilters: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hotels: PropTypes.array.isRequired,
    filterQty: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchHotels: PropTypes.func,
      setFilter: PropTypes.func,
    }.isRequired)
  };

  componentDidMount() {
    this.props.actions.fetchHotels().then(() => {
      this.setState({
        hotels: this.props.hotels
      })
    })
  }

  sortedByPool = (hotels) => {
    return hotels.reduce((acc, hotel) => {
      if (hotel.hasPool === 'true')
        acc.push(hotel)
      return acc
    }, []);
  };

  sortedByRate = (hotels, rate) => {
    return hotels.reduce((acc, hotel) => {
      if (hotel.rate >= rate)
        acc.push(hotel);
      return acc
    }, []);
  };

  sortByQuery = (hotels, searchQuery) => {
    return hotels.reduce((acc, hotel) => {
      if (hotel.name.includes(searchQuery))
        acc.push(hotel);
      return acc
    }, []);
  };

  searchHandler = () => {
    const { hotels, activeFilters } = this.props;
    let result = [];
    if (!!activeFilters.pool) {
      result = this.sortedByPool(hotels);
    }
    let filteredHotels = result.length > 0 ? result : hotels;
    if (!!activeFilters.star) {
      result = this.sortedByRate(filteredHotels, activeFilters.star)
    }
    result = result.length > 0 ? result : hotels;
    if (!!activeFilters.searchQuery)
      result = this.sortByQuery(result, activeFilters.searchQuery);
    this.setState({ hotels: result, hasFiltered: true, resetFilters: false })
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render() {
    const { hotels } = this.state;
    const { isLoading, classes, theme, actions, activeFilters } = this.props;

    if (isLoading) {
      return (
        <Grid container spacing={24}>
          <CircularProgress className={classes.progress}/>
        </Grid>
      );
    }

    const drawer = (
      <div>
        <div className={classes.toolbar}/>
        <Divider/>
        <div className={classes.content}>
          <FilterPanel
            sortBy={this.searchHandler.bind(this)}
            setFilter={actions.setFilter}
            activeFilters={activeFilters}
          />
          <SearchBox
            searchHandler={this.searchHandler.bind(this)}
            activeFilters={activeFilters}
            setFilter={actions.setFilter}
          />
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Hotels>
            {hotels.map((hotel, index) =>
              <HotelCard
                hotel={hotel}
                key={index}/>
            )}
          </Hotels>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainPage);