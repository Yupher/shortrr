import React from "react";

const DeleteBtn = ({ text, del, id }) => {
  const onClick = () => {
    del(id);
  };
  return (
    <button
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className="deleteBtn"
    >
      {text}
    </button>
  );
};

export default DeleteBtn;
