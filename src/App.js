import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import styled from "styled-components";

const StarRating = styled.div`
  font-size: 26px;
`;
const FilterLabel = styled.div`
  padding-top: 5px;
  font-size: 20px;
`;
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [search, setSearch] = useState(false);
  const [defResults, setDefResults] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voteAverage, setVoteAverage] = useState(0);
  const apiKey = "eeec2429b31a143e915ed959aad485f0";

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(true);
  };

  const onStarClick = (nextValue, prevValue, name) => {
    if (nextValue === prevValue) {
      setStarRating(0);
      setVoteAverage(0);
      return;
    }
    setVoteAverage((nextValue - 1) * 2);
    setStarRating(nextValue);
  };

  useEffect(() => {
    const fetchMovies = () => {
      if (search) {
        fetchSearch();
      } else {
        fetchTopRatedMovies();
      }
    };
    const fetchSearch = () => {
      const url =
        searchInput === ""
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`
          : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=1&include_adult=false`;
      axios
        .get(url)
        .then(function (res) {
          console.log("se realizo fetch de busqueda");
          //   setSearchResults(res.data);

          setSearchResults(res.data);
          setSearch(false);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const fetchTopRatedMovies = () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`;
      axios.get(url).then((res) => {
        // setTopRatedMovies(res.data);
        setDefResults(res.data);

        console.log("Se realizo fetch completo");
        setLoading(false);
      });
    };

    fetchMovies();
    // fetchTopRatedMovies();
  }, [search]);
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="Form">
          <div className="d-flex justify-content-center ">
            <form className="form-inline" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-12">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    placeholder="Search movies"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="filter">
          <FilterLabel>Filter movies by rating</FilterLabel>
          <StarRating>
            <StarRatingComponent
              name="starRating"
              value={starRating}
              onStarClick={onStarClick}
            />
          </StarRating>
        </div>
        {searchResults && (
          <div className="">
            <h3>Search results:</h3>
            <Movies
              results={searchResults}
              loading={loading}
              voteAverage={voteAverage}
            ></Movies>
          </div>
        )}
        {!searchResults && (
          <div className="">
            <h3>Top rated movies:</h3>
            <Movies
              results={defResults}
              loading={loading}
              voteAverage={voteAverage}
            ></Movies>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
