import React from "react";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

const Card = ({ name, id, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "singleCard",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
    }),
  }))

  const handleClick = () => {
    //This should send back the modal status with directions to open a ticket with this id
  }

  return (
    <li
      className="card"
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={drag}
      onClick={handleClick}
    >
      {name}
    </li >
  )
}

export default Card