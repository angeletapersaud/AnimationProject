import { format } from "date-fns";

//define GhibliFilm column header data and api keys to associate it with
export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Director",
    accessor: "director",
  },
  {
    Header: "Movie Poster",
    accessor: "image",
    maxWidth: 70,
    minWidth: 70,
    Cell: ({ cell: { value } }) => (
      <img src={value} width={220} height={300} alt="" />
    ),
  },
  {
    Header: "Release Date",
    accessor: "release_date",
    Cell: ({ value }) => {
      return format(new Date(value), "yyyy");
    },
  },
];
