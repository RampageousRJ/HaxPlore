import { Button } from "@nextui-org/react";
import React from "react";

function IndividualRow(props) {
  const { name, _id, date, slot } = props.details;
  const fn = props.fn;
  const fn2 = props.fn2;

  return (
    <>
      <td>{name || "Swapnil"}</td>
      <td>{_id}</td>
      <td>{date}</td>
      <td>{slot}</td>
      <Button variant="primary" onClick={()=>fn(_id)}>View</Button>
      <Button variant="error" onClick={()=>fn2(_id)}>Delete</Button>
    </>
  );
}

export default IndividualRow;
