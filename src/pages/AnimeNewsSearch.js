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
  let [isLoaded, setIsLoaded] = useState(false);
  let [animeList, setAnimeList] = useState([]);
  let [currentPageIndex, setCurrentPageIndex] = useState(0);
  let [nextAnimePage, setAnimeNextPage] = useState(1);
  const [queryValue, setQueryValue] = useState("");
  let [canNextPageOverride, setCanNextPageOverride] = useState(true);

    //useEffect will rerender the component everytime any state updates
  useEffect(() => {
    doFetchAll();
  },[]);

    //GET api to fetch the table data 
  async function doFetchAll() {
    try { 
    let replyJson = await axios(
      "https://api.jikan.moe/v4/anime?page=" + nextAnimePage);
      setIsLoaded(true);
      replyJson.data.data.forEach(element => {
        setAnimeList(myArray => [...myArray,element ])
      });
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
    finally{
      
    }
  }

    //GET api to query for all data containing search input 
  async function doFetchAllbyName(event) {
    try {
      event.preventDefault();
      let replyJson = await axios(
        "https://api.jikan.moe/v4/anime?q=" + queryValue
      );
      setIsLoaded(true);
      setCurrentPageIndex(0);
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
  async function nextPageOverride(event) {
    try{
      
    if(queryValue === ''){//|| (pageOptions.length - (pageIndex + 2)) < 3 
      if(!canNextPage){
        if(isLoaded)setIsLoaded(false);
        else setIsLoaded(true);
        setAnimeNextPage(prev=>prev+1);
        setCanNextPageOverride(false);
        //setTimeout(doFetchAll,5000);
        doFetchAll();
        setCanNextPageOverride(true);
        
      }
      
    }
    // else{
    //   if(!canNextPage){
    //     if(isLoaded)setIsLoaded(false);
    //     else setIsLoaded(true);
    //     setAnimeNextPage(prev=>prev+1);
    //     setCanNextPageOverride(false);
    //     //setTimeout(doFetchAllbyName,5000);
    //     setAnimeList([]);
    //     doFetchAllbyName();
    //     setCanNextPageOverride(true);
        
    //   }
    // }
    setCurrentPageIndex(prev=> prev + 1)
    if(canNextPageOverride){
      nextPage();
    }
    
  }
  catch (error) {
    setIsLoaded(true);
    setError(error);
  }
    
    
   
  }

  async function previousPageOverride() {
    setCurrentPageIndex(prev=> prev - 1)
    previousPage();
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
        pageIndex: currentPageIndex
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
    return <div id='loadingDiv'>Loading...</div>;
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
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            id="AnimeTablePaginationPrev-button"
            onClick={() => previousPageOverride()}
             disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            id="AnimeTablePaginationNext-button"
            onClick={() => nextPageOverride()}
            disabled={!canNextPageOverride}
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
