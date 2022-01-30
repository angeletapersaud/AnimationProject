import { format } from "date-fns"
export const COLUMNS = [
    {
       Header: 'ID',
       accessor :'mal_id',
    },
    {
        Header: 'Title',
        accessor: 'title',
    },
    {
      Header: 'Score',
      accessor: 'score',
    },
    {
        Header: "Image",
        accessor: "images.jpg.image_url",
        maxWidth: 70,
        minWidth: 70,
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            width={220}
            height={300}
            alt = ''
          />
        )
      },
    {
        Header: 'Year',
        accessor: 'year',
        Cell: ({value}) => {return format(new Date(value),'yyyy')}
    },
  ]