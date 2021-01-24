import React, { useState } from "react";

import Button from '@material-ui/core/Button';

const BoardCarrier = (props) => {
  const [content, setContent] = useState(props.location.state?.selected_carrier_id);
  
  const onClickBack = () => {
    props.history.push({
      pathname:"/boardCO2Analytics",
    });
  }
  return (
    <div className="container">
      <Button variant="outlined" onClick={() => onClickBack()}>Back</Button>
      <header className="jumbotron">
        <h1>
          Wellcome to the carrier page
        </h1>
        <h3>Selected carrier Id: {content}</h3>
      </header>
    </div>
  );
};

export default BoardCarrier;
