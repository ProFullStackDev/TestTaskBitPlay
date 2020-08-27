import React from 'react';
import {Button} from 'react-bootstrap';

const Delete = props => {
  return (
    <Button
      style={{padding: `0px 4px 0px 4px`}}
      variant="danger"
      onClick={() => props.onPress ()}
    >
      Delete
    </Button>
  );
};

export default Delete;
