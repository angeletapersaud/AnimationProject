import { format } from "date-fns";
import GhibliService from '../../services/GhibliService';
import { useNavigate } from 'react-router-dom';

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
    accessor: "moviePoster",
    // accessor: "image",
    maxWidth: 70,
    minWidth: 70,
    Cell: ({ cell: { value } }) => (
      <img src={value} width={220} height={300} alt="" />
    ),
  },
  {
    Header: "Release Date",
    accessor: "releaseDate",
    // accessor: "release_date",
    // Cell: ({ value }) => {
    //   return format(new Date(value), "yyyy");
    // },
  },

    {
      Header: "Modify",
      Cell: (props) => {
        let navigate = useNavigate();
        //console.log('props.row.original.id ',props.row.original.id);
        return(
        <div>
           <button onClick={() => navigate('/delete-ghibli/id:'+props.row.original.id)}> Delete </button>
           <button onClick={() => navigate('/update-ghibli/id:'+props.row.original.id)}> Update </button>
           <button onClick={() => navigate('/view-ghibli/id:'+props.row.original.id)}> View </button>
        </div>
      )
      }
    },
 ];
