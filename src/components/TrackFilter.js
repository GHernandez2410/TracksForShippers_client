import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import 'date-fns';
import {subDays} from 'date-fns';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import { getShipments } from "../actions/shipments";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function TrackFilter() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [state, setState] = useState({
    type_of_calculations: '',
    type_of_goods: '',
    start_city: '',
    end_city: ''
  });
  const [startDate, setStartDate] = useState(subDays(new Date(), 70));
  const [endDate, setEndDate] = useState(subDays(new Date(), 70));

  const handleChange = (event) => {
    event.preventDefault()
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const subbmitFilter = () => {
    let filter = {
      start_time: moment.utc(startDate).toISOString(),
      end_time: moment.utc(endDate).toISOString(),
      type_of_calculations: state.type_of_calculations,
      type_of_goods: state.type_of_goods,
      start_city: state.start_city,
      end_city: state.end_city
    }
    dispatch(getShipments(filter))
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="start_time_date-picker-dialog"
          label="Start time"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={startDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="end_time_date-picker-dialog"
          label="End time"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={endDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
      <Grid style={{marginLeft: 150}}>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={state.type_of_calculations}
            onChange={handleChange}
            inputProps={{
              name: 'type_of_calculations',
              id: 'type_of_calculations-label-placeholder',
            }}
          >
            <option value="">None</option>
            <option value="primary">primary</option>
            <option value="modeled">modeled</option>
            <option value="default">default</option>
          </NativeSelect>
          <FormHelperText>Type of calculations</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <NativeSelect
            value={state.type_of_goods}
            onChange={handleChange}
            inputProps={{
              name: 'type_of_goods',
              id: 'type_of_goods-label-placeholder',
            }}
          >
            <option value="">None</option>
            <option value="Container">Container</option>
            <option value="Chemicals">Chemicals</option>
            <option value="Cereals">Cereals</option>
          </NativeSelect>
          <FormHelperText>Type of goods</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
        <NativeSelect
          value={state.start_city}
          onChange={handleChange}
          inputProps={{
            name: 'start_city',
            id: 'start_city-label-placeholder',
          }}
        >
          <option value="">None</option>
          <option value="Hamburg">Hamburg</option>
          <option value="München">München</option>
          <option value="Berlin">Berlin</option>
        </NativeSelect>
        <FormHelperText>Start city</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={state.end_city}
          onChange={handleChange}
          inputProps={{
            name: 'end_city',
            id: 'end_city-label-placeholder',
          }}
        >
          <option value="">None</option>
          <option value="Hamburg">Hamburg</option>
          <option value="München">München</option>
          <option value="Bremen">Bremen</option>
          <option value="Berlin">Berlin</option>
        </NativeSelect>
        <FormHelperText>End city</FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<FilterListIcon />}
        style={{ marginLeft: 20 }}
        onClick={()=>subbmitFilter()}
        >
          Filter
        </Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
