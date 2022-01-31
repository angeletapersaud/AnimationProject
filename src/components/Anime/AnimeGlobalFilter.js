import React from "react";

//pass in filter box input and use the destructered setFilter function to rerender the table
const AnimeGlobalFilter = ({ filter, setFilter }) => {
  return (
    <div id="AnimeSearchBoxes">
      <span id="AnimeGlobalFilter-span">
        Filter:{" "}
        <input
          id="AnimeGlobalFilter-inputTextBox"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </div>
  );
};
export default AnimeGlobalFilter;
