import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles/index";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
  table: {

  }
});

let id = 0;
function createData(name, price) {
  id += 1;
  return { id, name, price };
}


const HotelPrice = ({classes, price }) => {

  const rows = [
    createData('Single', price.single),
    createData('Double', price.double),
    createData('Twin', price.twin),
  ];

  return (
    <div>
      <Typography variant="subtitle1">
        Price:
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Location</CustomTableCell>
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

    </div>
  );
};

HotelPrice.PropTypes = {
  price: PropTypes.object.isRequired
};

export default withStyles(styles)(HotelPrice);