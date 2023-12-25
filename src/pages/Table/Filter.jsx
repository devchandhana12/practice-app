import React from "react";
import { FaSearch } from "react-icons/fa";

const Filter = ({ columnFilters, setColumnFilters, onFilterChange }) => {
  const personName = columnFilters?.find((f) => f.id === "name")?.value;

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "goldenrod",
        width: 300,
        padding: 7,
        margin: 10,
        borderRadius: 15,
      }}
    >
      <input
        style={{
          backgroundColor: "transparent",
          outline: "none",
          border: "none",
          width: 250,
        }}
        placeholder="Search..."
        value={personName}
        onChange={(e) => onFilterChange("name_first", e.target.value)}
      />
      <FaSearch />
    </div>
  );
};

export default Filter;
