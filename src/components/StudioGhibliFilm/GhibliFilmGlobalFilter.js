import React from "react";

//pass in filter box input and use the destructered setFilter function to rerender the table
const GhibliFilmGlobalFilter = ({ filter, setFilter }) => {
  return (
    <span id="GhibliFilmGlobalFilter-span">
      {/* Filter:{" "} */}
      <input
        id="GhibliFilmGlobalFilter-inputTextBox"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder = "Filter Ghibli Table"
      />
    </span>
  );
};
export default GhibliFilmGlobalFilter;
