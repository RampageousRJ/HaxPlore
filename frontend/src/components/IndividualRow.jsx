import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
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
      <td>
        <FaEye
          className="cursor-pointer hover:text-teal-400 font-bold text-teal-700"
          onClick={() => fn(_id)}
        />
      </td>
      <td>
        <MdDelete
          className="cursor-pointer hover:text-red-400 text-red-700"
          onClick={() => fn2(_id)}
        />
      </td>
    </>
  );
}

export default IndividualRow;
