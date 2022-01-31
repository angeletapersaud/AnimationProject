import React from "react";

function Anime(props) {
  return (
    <div id="anime-container">
      <div id="anime-div">
        <h3 id="anime-title">Title: {props.anime.title}</h3>
        <h3 id="anime-director">Episodes: {props.anime.episodes}</h3>
        <iframe
          title="anime-trailer"
          id="anime-trailer"
          width="840"
          height="630"
          src={props.anime.trailer.youtube_id}
          allow="autoplay"
          alt=""
        ></iframe>
        ;<h3 id="anime-release-date">Released: {props.ghibliFilm.year}</h3>
        <h3 id="anime-release-description">Synopsis: {props.anime.synopsis}</h3>
      </div>
    </div>
  );
}

export default Anime;
