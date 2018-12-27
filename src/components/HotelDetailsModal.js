import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Modal, Grid, CardMedia, Card, Divider, CardContent } from '@material-ui/core';
import HotelRaiting from "./HotelRaiting";
import HotelPrice from "./HotelPrice";


function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const styles = theme => ({
  card: {
    display: 'flex',
    margin: 5,
  },
  media: {
    minWidth: '100%',
    minHeight: 300,
  },
  content: {
    flex: 1,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  divider: {
    padding: 10
  }
});

const HotelDetailModal = ({ classes, handleClose, hotel, open }) => {

  const rate = parseFloat(hotel.rate);

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h6" id="modal-title">
                {hotel.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={hotel.img}
                  title={hotel.name}
                />
                <CardContent className={classes.content}>

                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subheading" gutterBottom>
                Address: {hotel.address}
              </Typography>
              <div className={classes.divider}>
                <Divider variant="middle"/>
              </div>
              <Typography variant="subheading" gutterBottom>
                Raiting: <HotelRaiting rate={rate}/>
              </Typography>
              <div className={classes.divider}>
                <Divider variant="middle"/>
              </div>
              <Typography variant="subheading" gutterBottom>
                Description
              </Typography>
              <Typography component='p'>
                {hotel.description}
              </Typography>
              <HotelPrice price={hotel.price}/>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

HotelDetailModal.PropTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  hotel: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(HotelDetailModal);