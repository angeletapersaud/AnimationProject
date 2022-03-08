import React, { useState } from "react";
import GhibliService from '../../services/GhibliService';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';

 const UpdateGhibliFilm= (props) => {
  //states
  let navigate = useNavigate();
  const { id } = useParams();
  let [title, setTitle] = useState("");
  let [director, setDirector] = useState("");
  let [moviePoster, setMoviePoster] = useState("");
  let [releaseDate, setReleaseDate] = useState("");
  let [description, setDescription] = useState("");
  let [movieBanner, setMovieBanner] = useState("");
  let [submitted, setSubmitted] = useState(false);
  let [updateGhibliFilm, setUpdateGhibliFilm] = useState({
    "title": "",
    "director": "",
    "moviePoster": "",
    "releaseDate": "",
    "description": "",
    "movieBanner": ""
});
let [returnedGhibliFilm, setReturnedGhibliFilm] = useState({
  id: "",
  title: "",
  director: "",
  moviePoster: "",
  releaseDate: "",
  "description": "",
   "movieBanner": ""
});

const getGhibliFilm = () => {
  GhibliService.getGhibliById(id.replace(":", "")).then((res) => {
    let ghibli = res.data;
    setReturnedGhibliFilm({
      id: ghibli.id,
      title: ghibli.title,
      director: ghibli.director,
      moviePoster: ghibli.moviePoster,
      releaseDate: ghibli.releaseDate,
      description:ghibli.description,
      movieBanner:ghibli.movieBanner,
    });
  });
};

useEffect(() => {
  window.scrollTo(0, 0);//scroll to the top
  getGhibliFilm();
}, []);

  //handle any change to input boxes
  const handleChange = (event) => { 
    displaySuccessfullyAddedMessage();
    setSubmitted((prevSubmitted) => false);
    if (event.target.id === "ghibli-title") {
      setTitle(event.target.value);
    } else if (event.target.id === "ghibli-director") {
      setDirector(event.target.value);
    } else if (event.target.id === "ghibli-moviePoster") {
      setMoviePoster(event.target.value);
    }else if (event.target.id === "ghibli-releaseDate") {
      setReleaseDate(event.target.value);
    }else if (event.target.id === "ghibli-Description") {
      setDescription(event.target.value);
    }else if (event.target.id === "ghibli-movieBanner") {
      setMovieBanner(event.target.value);
    }

    //update Ghibli Film object to be posted to server
    setUpdateGhibliFilm(
      {
        "title":       event.target.id === "ghibli-title" ? event.target.value : returnedGhibliFilm.title,
        "director":    event.target.id === "ghibli-director" ? event.target.value : returnedGhibliFilm.director,
        "moviePoster": event.target.id === "ghibli-moviePoster" ? event.target.value : returnedGhibliFilm.moviePoster,
        "releaseDate": event.target.id === "ghibli-releaseDate" ? event.target.value : returnedGhibliFilm.releaseDate,
        "description": event.target.id === "ghibli-Description" ? event.target.value : returnedGhibliFilm.description,
        "movieBanner": event.target.id === "ghibli-movieBanner" ? event.target.value : returnedGhibliFilm.movieBanner,
      }
    )
  }

  //async service to give it time to complete just incase server is running slow
  async function doCreateGhibliFilm() {
    await GhibliService.createGhibli(updateGhibliFilm);
  }

  async function doFetchAllGhibliFilm() {
    let replyJson = await GhibliService.getAllGhiblis();
    props.setghibliFilmList(replyJson.data);
  }

    //handle submit
     const handleSubmit = (event) => {
      event.preventDefault();
      //console.log('newGhibliFilm a',newGhibliFilm);
      // setNewGhibliFilm(
      //   {
      //     "title": title,
      //     "director": director,
      //     "moviePoster": moviePoster,
      //     "releaseDate": releaseDate,
      //     "description": description,
      //     "movieBanner": movieBanner
      //   }
      // );
      //doCreateGhibliFilm();
      GhibliService.updateGhibliById(updateGhibliFilm,id.replace(":", "")).then((res)=>{
        setSubmitted((prevSubmitted) => true);

        //reset post object values
        setTitle("");
        setDirector("");
        setMoviePoster("");
        setReleaseDate("");
        setDescription("");
        setMovieBanner("");
  
        //call to remove successful message display to prepare form for new message
        displaySuccessfullyAddedMessage();
  
        //add the Film to the table to be displayed immediately
        //props.setghibliFilmList(myArray => [...myArray,newGhibliFilm ])
        //doFetchAllGhibliFilm();
      });


    };

    //use to show successful message when post is complete
    function displaySuccessfullyAddedMessage() {
      var ele = document.getElementById('AddedGhibli');
      if (submitted) {
        ele.style.hidden = false;
      }else{
        ele.style.hidden = true;
      }
    }
    const done = (e) => {
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

            <h3 className="text-center">Updating Ghibli Film: {returnedGhibliFilm.title} </h3>
            </div>
            <form onSubmit={handleSubmit} id="AddFilmForm" className="gf">
                 {/* <button id="add-ghibli-film-btn">Add</button> */}
                 <div>
                    <button id="add-ghibli-film-btn">Update</button> 
                 </div>
              <label className="form-label-ghibli" htmlFor="ghibli-title">
                Title:
              </label>
              <input id="ghibli-title" 
              onChange={handleChange} 
              value={title}
              placeholder = {returnedGhibliFilm.title} />

              <label className="form-label-ghibli" htmlFor="ghibli-director">
                Director:
              </label>
              <input
                id="ghibli-director"
                onChange={handleChange}
                value={director}
                placeholder = {returnedGhibliFilm.director}
              />

              <label className="form-label-ghibli" htmlFor="ghibli-moviePoster">
                Poster:
              </label>
              <input
                id="ghibli-moviePoster"
                onChange={handleChange}
                value={moviePoster}
                placeholder = {returnedGhibliFilm.moviePoster}
                // type="file"
                // name="myImage" accept="image/png, image/gif, image/jpeg"
              />
              

              <label className="form-label-ghibli" htmlFor="ghibli-releaseDate">
                Released:
              </label>
              <input
                id="ghibli-releaseDate"
                onChange={handleChange}
                value={releaseDate}
                placeholder = {returnedGhibliFilm.releaseDate}
              />

              <label className="form-label-ghibli" htmlFor="ghibli-Description">
              Description:
              </label>
              <input
                id="ghibli-Description"
                onChange={handleChange}
                value={description}
                placeholder = {returnedGhibliFilm.description}
              />

              <label className="form-label-ghibli" htmlFor="ghibli-movieBanner">
              Banner:
              </label>
              <input
                id="ghibli-movieBanner"
                onChange={handleChange}
                value={movieBanner}
                placeholder = {returnedGhibliFilm.movieBanner}
              />
                <span id="AddedGhibli" hidden = {!submitted}>Success Updating!</span>
                <button className="btn-confirm-delete"onClick={done}> Done </button>
            </form>
          </div>
        </div>
      </div>
    );
 
}

export default UpdateGhibliFilm;
