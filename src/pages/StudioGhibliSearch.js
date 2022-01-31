import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "../components/StudioGhibliFilm/GhibliFilmColumns";
import axios from "axios";
import StudioGhibliFilm from "../components/StudioGhibliFilm/StudioGhibliFilm";
import "../components/StudioGhibliFilm/GhibliFilmTable.css";
import GhibliFilmGlobalFilter from "../components/StudioGhibliFilm/GhibliFilmGlobalFilter";

const StudioGhibliSearch = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ghibliFilmList, setghibliFilmList] = useState([]);
  const [ghibliFilm, setghibliFilm] = useState([]);
  const [previousAnimeID, setpreviousAnimeID] = useState([]);

  //useEffect will rerender the component everytime any state updates
  useEffect(() => {
    doFetchAll();
  }, []);

  //GET api to fetch the table data 
  async function doFetchAll() {
    try {
      let replyJson = await axios("https://ghibliapi.herokuapp.com/films/");
      setIsLoaded(true);
      setghibliFilmList(replyJson.data);
      const additionalDetailsEle = document.getElementById(
        "StudioGhibliFilm-div"
      );
      if (additionalDetailsEle != null) {
        additionalDetailsEle.hidden = true;
      }
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  //GET api to fetch on json object by id
  async function doFetchOne(id) {
    try {
      let replyJson = await axios(
        "https://ghibliapi.herokuapp.com/films/" + id
      );
      setIsLoaded(true);
      setghibliFilm(replyJson.data);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  //shows and hides additional data when a table row is clicked on
  function showAnimeDetails(row) {
    const additionalDetailsEle = document.getElementById(
      "StudioGhibliFilm-div"
    );
    if (previousAnimeID === row[0].value) {
      additionalDetailsEle.hidden = !additionalDetailsEle.hidden;
    } else {
      doFetchOne(row[0].value);
      additionalDetailsEle.hidden = false;
      setpreviousAnimeID(row[0].value);
    }
  }

  //set the column headers and data source
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => ghibliFilmList, [ghibliFilmList]);

   //destructer useTable hook to get access to functions and properties
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["id"], //hide the id colum
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <GhibliFilmGlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
        <table {...getTableProps()} id="StudioGhibliFilm-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => showAnimeDetails(row.allCells)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div id="GhibliFilmTablePagination-div">
          <button
            id="ArrowBtnPrevStudioGhib"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            id="GhibliFilmTablePaginationPrev-button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            id="GhibliFilmTablePaginationNext-button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            id="ArrowBtnNextStudioGhib"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <select
            id="GhibliFilmTable-Selector"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div id="StudioGhibliFilm-div">
          {<StudioGhibliFilm ghibliFilm={ghibliFilm} />}
        </div>
      </>
    );
  }
};

export default StudioGhibliSearch;
