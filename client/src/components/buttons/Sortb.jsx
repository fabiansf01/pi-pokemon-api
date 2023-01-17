import React from "react";
import { select } from "../../styles/Select.module.css";


const Sortb = ({ handleSort, sortDescription}) => {

  return (
    <div className={select}>
      <select
        name="sortOption"
        onChange={(e) => {
          handleSort(e.target.value);
        }}
      >
        <option value="default">{sortDescription}</option>
        <option value="asc">Menor a Mayor</option>
        <option value="desc">Mayor a Menor</option>
      </select>
    </div>
  );
};

export default Sortb;
