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
      resetFilters: false,
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hotels: PropTypes.array.isRequired,
    filterItems: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchHotels: PropTypes.func
    }.isRequired)
  };

  componentDidMount() {
    this.props.actions.fetchHotels().then(() => {
      this.setState({
        hotels: this.props.hotels
      })
    })
  }

  searchHandler = (value, key) => {
    const { hotels } = this.state;
    const filteredHotels = hotels.reduce((acc, hotel) => {
      if (key === 'name') {
        if (hotel[key].includes(value))
          acc.push(hotel)
      } else if (key === 'rate') {
        if (hotel[key] >= value)
          acc.push(hotel)
      } else {
        if (hotel[key] === 'true')
          acc.push(hotel)
      }
      return acc
    }, []);
    this.setState({ hotels: filteredHotels, hasFiltered: true, resetFilters: false })
  };

  resetSearchResult = () => {
    this.setState({ hotels: this.props.hotels, resetFilters: true })
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  render() {
    const { hotels, resetFilters } = this.state;
    const { isLoading, classes, theme } = this.props;

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
            resetFilters={resetFilters}
          />
          <SearchBox searchHandler={this.searchHandler.bind(this)} resetFilters={resetFilters}/>
          <Button variant="outlined" size="small" color="default" className={classes.margin} onClick={this.resetSearchResult}>
            Clear Filters
          </Button>
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