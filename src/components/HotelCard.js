import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HotelDetailModal from './HotelDetailsModal';
import HotelRaiting from "./HotelRaiting";
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: 10,
  },
  button: {
    backgroundImage: 'linear-gradient(-111deg, #ED3535 4%, #F16534 100%)',
  },
  buttonBox: {
    marginTop: 'auto',
  },
  content: {
    flex: '1 2 auto',
  },
  media: {
    minWidth: 250,
    minHeight: 250,
  },
  actions: {
    minWidth: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: '1px solid #1110100d'
  },
  priceBox: {
    minWidth: '100%',
    alignSelf: 'flex-start',
    marginTop: '50%'
  },
});


const HotelCard = (props) => {
  const { classes, hotel } = props;
  const [showModal, setShowModal] = useState(false);

  const rate = parseFloat(hotel.rate);

  function handleButtonClick() {
    setShowModal(!showModal)
  };

  return (

    <React.Fragment>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={hotel.img}
          title={hotel.name}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="headline" component="h2">
            {hotel.name}
          </Typography>
          <Typography component="h6">
            {hotel.address}
          </Typography>
          <HotelRaiting rate={rate}/>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.priceBox}>
            <Typography variant="h5" gutterBottom>
              $ {hotel.price.double}
            </Typography>
          </div>
          <div className={classes.buttonBox}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleButtonClick}
            >
              View Deal
            </Button>
          </div>
        </CardActions>
      </Card>
      <HotelDetailModal
        open={showModal}
        hotel={hotel}
        handleClose={handleButtonClick}/>
    </React.Fragment>
  );
};

HotelCard.PropTypes = {
  hotel: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HotelCard);