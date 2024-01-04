import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Empty.css";

function Empty() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    const existingMovies = JSON.parse(localStorage.getItem("movies")) || [];
    if (existingMovies.length > 0) {
      navigate("/mymovie");
    }
  }, [navigate]);

  const handleAddMovie = () => {
    navigate("/createmovie");
  };

  return (
    <div className="logincontainer">
      <div className="cont2">
        <h1>Your movie list is empty</h1>
        <form action="" className="formClassLogin">
          <button className="LoginButton" onClick={handleAddMovie}>
            Add a New Movie
          </button>
        </form>
      </div>
    </div>
  );
}

export default Empty;
