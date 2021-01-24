import React from 'react';
import { useSelector } from "react-redux";

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'id' },
  { id: 'shipper_company_id', numeric: true, disablePadding: false, label: 'shipper company id' },
  { id: 'carrier_company_id', numeric: true, disablePadding: false, label: 'carrier company id' },
  { id: 'truck_id', numeric: true, disablePadding: false, label: 'truck id' },
  { id: 'co2_model_id', numeric: true, disablePadding: false, label: 'co2 model id' },
  { id: 'travelled_distance', numeric: true, disablePadding: false, label: 'travelled_distance' },
  { id: 'fuel_consumed', numeric: true, disablePadding: false, label: 'fuel_consumed' },
  { id: 'estimated_fuel_consumed', numeric: true, disablePadding: false, label: 'estimated_fuel_consumed' },
  { id: 'weight', numeric: true, disablePadding: false, label: 'weight' },
  { id: 'type_of_goods', numeric: true, disablePadding: false, label: 'type_of_goods' },
  { id: 'start_country', numeric: true, disablePadding: false, label: 'start_country' },
  { id: 'start_city', numeric: true, disablePadding: false, label: 'start_city' },
  { id: 'start_postcode', numeric: true, disablePadding: false, label: 'start_postcode' },
  { id: 'end_country', numeric: true, disablePadding: false, label: 'end_country' },
  { id: 'end_city', numeric: true, disablePadding: false, label: 'end_city' },
  { id: 'end_postcode', numeric: true, disablePadding: false, label: 'end_postcode' },
  { id: 'type_of_calculations', numeric: true, disablePadding: false, label: 'type_of_calculations' },
  { id: 'allocated_distance', numeric: true, disablePadding: false, label: 'allocated_distance' },
  { id: 'allocated_fuel', numeric: true, disablePadding: false, label: 'allocated_fuel' },
  { id: 'total_co2_emitted', numeric: true, disablePadding: false, label: 'total_co2_emitted' },
  { id: 'creation_timestamp', numeric: true, disablePadding: false, label: 'creation_timestamp' },
  { id: 'last_updated_timestamp', numeric: true, disablePadding: false, label: 'last_updated_timestamp' },
  { id: 'start_time', numeric: true, disablePadding: false, label: 'start_time' },
  { id: 'end_time', numeric: true, disablePadding: false, label: 'end_time' },
  { id: 'fuel_type', numeric: true, disablePadding: false, label: 'fuel_type' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{paddingLeft: 10}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Shippings table
        </Typography>
      )}
      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function TrackTable({ props }) {

  const { shipments: rows } = useSelector((state) => state.shipments);

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('shipper_company_id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const onClickCarrierId = (id) => {
    props.history.push({
        pathname:"/boardCarrier",
        state:{
          selected_carrier_id: id
        }
      }
    );
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell padding="checkbox">
                        <br/>
                      </TableCell>
                      <TableCell style={{paddingLeft: 10}} component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.shipper_company_id === null ? 'null': row.shipper_company_id}</TableCell>
                      <TableCell align="right">
                        <Button variant="outlined" onClick={()=>onClickCarrierId(row.carrier_company_id)}>{row.carrier_company_id === null ? 'null': row.carrier_company_id}</Button>
                      </TableCell>
                      <TableCell align="right">{row.truck_id === null ? 'null': row.truck_id}</TableCell>
                      <TableCell align="right">{row.co2_model_id === null ? 'null': row.co2_model_id}</TableCell>
                      <TableCell align="right">{row.travelled_distance === null ? 'null': row.travelled_distance}</TableCell>
                      <TableCell align="right">{row.fuel_consumed === null ? 'null': row.fuel_consumed}</TableCell>
                      <TableCell align="right">{row.estimated_fuel_consumed === null ? 'null': row.estimated_fuel_consumed}</TableCell>
                      <TableCell align="right">{row.weight === null ? 'null': row.weight}</TableCell>
                      <TableCell align="right">{row.type_of_goods === null ? 'null': row.type_of_goods}</TableCell>
                      <TableCell align="right">{row.start_country === null ? 'null': row.start_country}</TableCell>
                      <TableCell align="right">{row.start_city === null ? 'null': row.start_city}</TableCell>
                      <TableCell align="right">{row.start_postcode === null ? 'null': row.start_postcode}</TableCell>
                      <TableCell align="right">{row.end_country === null ? 'null': row.end_country}</TableCell>
                      <TableCell align="right">{row.end_city === null ? 'null': row.end_city}</TableCell>
                      <TableCell align="right">{row.end_postcode === null ? 'null': row.end_postcode}</TableCell>
                      <TableCell align="right">{row.type_of_calculations === null ? 'null': row.type_of_calculations}</TableCell>
                      <TableCell align="right">{row.allocated_distance === null ? 'null': row.allocated_distance}</TableCell>
                      <TableCell align="right">{row.allocated_fuel === null ? 'null': row.allocated_fuel}</TableCell>
                      <TableCell align="right">{row.total_co2_emitted === null ? 'null': row.total_co2_emitted}</TableCell>
                      <TableCell align="right">{row.creation_timestamp === null ? 'null': row.creation_timestamp}</TableCell>
                      <TableCell align="right">{row.last_updated_timestamp === null ? 'null': row.last_updated_timestamp}</TableCell>
                      <TableCell align="right">{row.start_time === null ? 'null': row.start_time}</TableCell>
                      <TableCell align="right">{row.end_time === null ? 'null': row.end_time}</TableCell>
                      <TableCell align="right">{row.fuel_type === null ? 'null': row.fuel_type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
