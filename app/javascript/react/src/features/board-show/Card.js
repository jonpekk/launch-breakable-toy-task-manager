import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ name, id, openDetailModal }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "singleCard",
    item: () => ({ id }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      didDrop: monitor.didDrop(),
    }),
  }))

  const handleClick = () => {
    openDetailModal(id)
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