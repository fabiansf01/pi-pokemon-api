import React from "react";
import { select } from "../../styles/Select.module.css";


const Sort = ({ handleSort, sortDescription}) => {

  return (
    <div className={select}>
      <select
        name="sortOption"
        onChange={(e) => {
          handleSort(e.target.value);
        }}
      >
        <option value="default">{sortDescription}</option>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A </option>
      </select>
    </div>
  );
};

export default Sort;
