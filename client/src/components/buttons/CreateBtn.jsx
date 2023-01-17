import React from "react";
import { Link } from "react-router-dom";
import { creabtn } from "../../styles/Buttons.module.css";

const CreateBtn = () => {
  return (
    <div>
      <Link to="/create">
        {" "}
        <button className={creabtn}>Crear Pokemon</button>
      </Link>
    </div>
  );
};

export default CreateBtn;
