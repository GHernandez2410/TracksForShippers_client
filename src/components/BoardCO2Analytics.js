import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import TrackTable from './TrackTable';
import TrackFilter from './TrackFilter';

import { getShipments } from "../actions/shipments";

const BoardCO2Analytics = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShipments())
  },[dispatch]);
  
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h2>
          <strong>
            Wellcome
          </strong>
        </h2>
        <p>
        <strong>User: </strong>
          {currentUser.data.username}
        </p>
        <p>
          <strong>Token:</strong> {currentUser.data.token.substring(0, 20)} ...{" "}
          {currentUser.data.token.substr(currentUser.data.token.length - 20)}
        </p>
      </header> 
      <TrackFilter/>
      <TrackTable props={props}/>
    </div>
  );
};

export default BoardCO2Analytics;
