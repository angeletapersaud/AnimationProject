import React, { useEffect, useState } from "react";
import GhibliService from "../../services/GhibliService";
import { useNavigate, useParams } from "react-router-dom";

const DeleteGhibliFilm = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  let [returnedGhibliFilm, setReturnedGhibliFilm] = useState({
    id: "",
    title: "",
    director: "",
    moviePoster: "",
    releaseDate: "",
    //"description": "",
    // "movieBanner": ""
  });

  useEffect(() => {
    getGhibliFilm();
  }, []);

  const getGhibliFilm = () => {
    GhibliService.getGhibliById(id.replace(":", "")).then((res) => {
      let ghibli = res.data;
      setReturnedGhibliFilm({
        id: ghibli.id,
        title: ghibli.title,
        director: ghibli.director,
        moviePoster: ghibli.moviePoster,
        releaseDate: ghibli.releaseDate,
        //description:ghibli.description,
        //   movieBanner:ghibli.movieBanner,
      });
    });
  };

  const doDeleteGhibli = (e) => {
    e.preventDefault();
    GhibliService.deleteGhibli(returnedGhibliFilm.id).then((res) => {
      navigate("/search/StudioGhibliSearch");
    });
  };

  const cancel = (e) => {
    e.preventDefault();
    navigate("/search/StudioGhibliSearch");
  };

  return (
    <div>
      <div>
        <div>
          <div className="">
            <div>
              {/* <label>Movie Poster: </label> */}
              <img
                className="form-group-movie-poster"
                src={returnedGhibliFilm.moviePoster}
                alt=""
                height="500"
                width="600"
              />
            </div>

            <h3 className="text-center">Are you sure you want to delete this Ghibli Film?</h3>
            <div>
              <form className="form-group">
                <div>
                  <label>ID: </label>
                  <input
                    placeholder="Id"
                    readOnly={true}
                    name="id"
                    className="form-control"
                    value={returnedGhibliFilm.id}
                  />
                </div>
                <div>
                  <label>Title: </label>
                  <input
                    placeholder="Title"
                    readOnly={true}
                    name="title"
                    className="form-control"
                    value={returnedGhibliFilm.title}
                  />
                </div>
                <div>
                  <label>Director: </label>
                  <input
                    placeholder="Director"
                    readOnly={true}
                    name="director"
                    className="form-control"
                    value={returnedGhibliFilm.director}
                  />
                </div>

                <div>
                  <label>Released: </label>
                  <input
                    placeholder="Release Date"
                    readOnly={true}
                    name="releaseDate"
                    className="form-control"
                    value={returnedGhibliFilm.releaseDate}
                  />
                </div>
                {/* <div className="form-group">
                                      <label>Description: </label>
                                      <input placeholder="Description" readOnly= {true} name="description" className="form-control"
                                         value={returnedGhibliFilm.description}/>
                                   </div> */}
                {/* <div className="form-group">
                                      <label>Movie Banner: </label>
                                      <img
                                      id="StudioGhibliImgMovieBanner"
                                      src={returnedGhibliFilm.movieBanner}
                                      alt=""
                                      height="530"
                                      width="900"
                                      />
                                   </div> */}

                {/* <button className="btn btn-success" onClick = {doDeleteGhibli}> Delete </button>
                                    <button className="btn btn-danger" onClick={cancel}> Cancel </button>                     */}
                <button className="btn-confirm-delete" onClick={doDeleteGhibli}> Delete </button>
                <button className="btn-confirm-delete"onClick={cancel}> Cancel </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteGhibliFilm;
