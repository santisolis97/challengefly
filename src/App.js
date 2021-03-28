import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Form from "./components/Form";
import axios from "axios";
import StarRatingComponent from "react-star-rating-component";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleSearch, updateSearchInput } from "./actions";

const StarRating = styled.div`
  font-size: 26px;
`;
const FilterLabel = styled.div`
  padding-top: 5px;
  font-size: 20px;
`;
function App(props) {
  const [starRating, setStarRating] = useState(0);
  const [defResults, setDefResults] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voteAverage, setVoteAverage] = useState(0);
  const apiKey = "eeec2429b31a143e915ed959aad485f0";

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
    console.log(props);
    const fetchMovies = () => {
      if (props.search) {
        fetchSearch();
      } else {
        fetchTopRatedMovies();
      }
    };

    const fetchSearch = () => {
      const url =
        props.searchInput === ""
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`
          : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${props.searchInput}&page=1&include_adult=false`;
      axios
        .get(url)
        .then(function (res) {
          setSearchResults(res.data);
          props.toggleSearch();

          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const fetchTopRatedMovies = () => {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`;
      axios.get(url).then((res) => {
        setDefResults(res.data);

        setLoading(false);
      });
    };

    fetchMovies();
  }, [props.search, props.searchInput]);
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Form />
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
function mapStateToProps(state) {
  return {
    searchInput: state.searchInput,
    search: state.search,
  };
}
const mapDispatchToProps = {
  updateSearchInput,
  toggleSearch,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
