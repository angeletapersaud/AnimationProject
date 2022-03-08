import React, { useState } from "react";
import GhibliService from '../../services/GhibliService';

 const CreateNewGhibliFilm= (props) => {
  //states
  let [title, setTitle] = useState("");
  let [director, setDirector] = useState("");
  let [moviePoster, setMoviePoster] = useState("");
  let [releaseDate, setReleaseDate] = useState("");
  let [description, setDescription] = useState("");
  let [movieBanner, setMovieBanner] = useState("");
  let [submitted, setSubmitted] = useState(false);
  let [newGhibliFilm, setNewGhibliFilm] = useState({
    "title": "",
    "director": "",
    "moviePoster": "",
    "releaseDate": "",
    "description": "",
    "movieBanner": ""
});

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
    setNewGhibliFilm(
      {
        "title":       event.target.id === "ghibli-title" ? event.target.value : title,
        "director":    event.target.id === "ghibli-director" ? event.target.value : director,
        "moviePoster": event.target.id === "ghibli-moviePoster" ? event.target.value : moviePoster,
        "releaseDate": event.target.id === "ghibli-releaseDate" ? event.target.value : releaseDate,
        "description": event.target.id === "ghibli-Description" ? event.target.value : description,
        "movieBanner": event.target.id === "ghibli-movieBanner" ? event.target.value : movieBanner,
      }
    )
  }

  //async service to give it time to complete just incase server is running slow
  async function doCreateGhibliFilm() {
    await GhibliService.createGhibli(newGhibliFilm);
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
      GhibliService.createGhibli(newGhibliFilm).then((res)=>{
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
        doFetchAllGhibliFilm();
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


    return (
      <div>
        <div>
          <div>
            <form onSubmit={handleSubmit} id="AddFilmForm" className="gf">
                 {/* <button id="add-ghibli-film-btn">Add</button> */}
                 <div>
                    <button id="add-ghibli-film-btn">Add</button> 
                 </div>
              <label className="form-label-ghibli" htmlFor="ghibli-title">
                Title:
              </label>
              <input id="ghibli-title" 
              onChange={handleChange} 
              value={title} />

              <label className="form-label-ghibli" htmlFor="ghibli-director">
                Director:
              </label>
              <input
                id="ghibli-director"
                onChange={handleChange}
                value={director}
              />

              <label className="form-label-ghibli" htmlFor="ghibli-moviePoster">
                Poster:
              </label>
              <input
                id="ghibli-moviePoster"
                onChange={handleChange}
                value={moviePoster}
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
              />

              <label className="form-label-ghibli" htmlFor="ghibli-Description">
              Description:
              </label>
              <input
                id="ghibli-Description"
                onChange={handleChange}
                value={description}
              />

              <label className="form-label-ghibli" htmlFor="ghibli-movieBanner">
              Banner:
              </label>
              <input
                id="ghibli-movieBanner"
                onChange={handleChange}
                value={movieBanner}
              />
                <span id="AddedGhibli" hidden = {!submitted}>Success!</span>
            </form>
          </div>
        </div>
      </div>
    );
 
}

export default CreateNewGhibliFilm;
