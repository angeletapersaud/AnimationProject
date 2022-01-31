import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "../components/Anime/AnimeColumns";
import axios from "axios";
import Anime from "../components/Anime/Anime";
import "../components/Anime/AnimeTable.css";
import AnimeGlobalFilter from "../components/Anime/AnimeGlobalFilter";
import id from "date-fns/esm/locale/id/index.js";

function AnimeNewsSearch() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [fullanimeList, setFullAnimeList] = useState([]);
  const [anime, setAnime] = useState([]);
  let [nextAnimePage, setAnimeNextPage] = useState(1);
  const [nextAnimeLink, setAnimeLink] = useState([""]);
  const [previousAnimeID, setpreviousAnimeID] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  let [lastPage, setLastPage] = useState(0);
  let [PageTracker, setPageTracker] = useState(1);

    //useEffect will rerender the component everytime any state updates
  useEffect(() => {
    doFetchAll();
  }, []);

    //GET api to fetch the table data 
  async function doFetchAll() {
    try {
      console.log("https://api.jikan.moe/v4/anime?page=" + nextAnimePage);    
      let replyJson = await axios(
        "https://api.jikan.moe/v4/anime?page=" + nextAnimePage);
      console.log("reply: ", replyJson);
      setIsLoaded(true);
      setAnimeList(replyJson.data.data);
      // setAnimeList(prevList => {
      //   return [
      //     ...prevList,
      //     replyJson.data.data
      //   ]
      // })
      setLastPage(replyJson.data.pagination.last_visible_page);
      
      // for(let i=0;i<replyJson.data.data.length -1;i++){
      //   fullanimeList.push(replyJson.data.data[i]);
      // }
      // setFullAnimeList(prevList=>prevList)
      console.log("animeList:", animeList);
      const additionalDetailsEle = document.getElementById("Anime-div");
      if (additionalDetailsEle != null) {
        additionalDetailsEle.hidden = true;
      }
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

    //GET api to query for all data containing search input 
  async function doFetchAllbyName(event) {
    try {
      event.preventDefault();
      let replyJson = await axios(
        "https://api.jikan.moe/v4/anime?q=" + queryValue
      );
      console.log("reply: ", replyJson);
      setIsLoaded(true);
      setAnimeList(replyJson.data.data);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  //tracks any changes in search box and updates QueryValue to be used on submission with api call
  const handleChange = (e) => {
    setQueryValue(e.target.value);
  };

  //override nextpage functionality to account for only 25 rows returned at a time
  function nextPageOverride() {
    // if (!canNextPage) {
    //   setAnimeNextPage((nextAnimePage) => nextAnimePage + 1);
    //   doFetchAll();
    // }
    nextPage();
    // setPageTracker((setPageTracker) => setPageTracker + 1);
  }

  function previousPageOverride() {
    // setAnimeNextPage((nextAnimePage) => nextAnimePage -1);
    // if (!canPreviousPage) {
    //   setAnimeNextPage((nextAnimePage) => nextAnimePage - 1);
    //   doFetchAll();
    // }
    previousPage();
    // setPageTracker((setPageTracker) => setPageTracker - 1);
  }

    //set the column headers and data source
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => animeList, [animeList]);

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
        hiddenColumns: ["mal_id"],
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
        <div id="AnimeSearch-div">
          <form onSubmit={doFetchAllbyName} className="cf">
            <span id="AnimeSearch-span">
              Anime : <input id="AnimeSearch-input" onChange={handleChange} />
              <button id="AnimeSearchBtn">Search</button>
            </span>
          </form>
        </div>

        <AnimeGlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
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
                <tr {...row.getRowProps()}>
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
        <div id="AnimeTablePagination-div">
          <button
            id="ArrowBtnPrevStudioGhib"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>{" "}
          <span>
            {/* Page{" "} */}
            <strong>
              {/* {PageTracker} of {lastPage - pageOptions.length} */}
            </strong>{" "}
          </span>
          <button
            id="AnimeTablePaginationPrev-button"
            onClick={() => previousPageOverride()}
            // disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            id="AnimeTablePaginationNext-button"
            onClick={() => nextPageOverride()}
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
            id="AnimeTable-Selector"
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
      </>
    );
  }
}

export default AnimeNewsSearch;
