import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ name, id, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "singleCard",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
    }),
  }))

  return (
    <li
      className="card"
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={drag}
    >
      {name}
    </li >
  )
}

export default Card