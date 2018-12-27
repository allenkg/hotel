import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles/index";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  }
});

let id = 0;

function createData(name, price) {
  id += 1;
  return { id, name, price };
}


const HotelPrice = ({ classes, price }) => {

  const rows = [
    createData('Single', price.single),
    createData('Double', price.double),
    createData('Twin', price.twin),
  ];

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Accommodation</CustomTableCell>
              <CustomTableCell align="right">Price</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">${row.price}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

HotelPrice.PropTypes = {
  price: PropTypes.object.isRequired
};

export default withStyles(styles)(HotelPrice);