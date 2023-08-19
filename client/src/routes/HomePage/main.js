import React, { Component } from 'react';

import Movie from './movieCart.js';

class MainComponent extends Component{
    constructor(){
        super();

        this.state = {
            url: window.location.href.replace('3000','5000'),
            movieList: []
        }

        this.loadMovieList = this.loadMovieList.bind(this);
    }

    componentDidMount = () => {
        this.loadMovieList();
    }

    loadMovieList = () => {
        console.log("Loading movie list from url " + this.state.url);
        
        fetch(this.state.url)
            .then((response => {response.json()
                .then(moviesList => {this.setState({ movieList: moviesList })})}));
    }

    render(){
        return(
            <div className='homeComponent'>
                <div id="componentHeading">Now playing movies</div>
                <div id="movieListContainer">{
                    this.state.movieList.map((movie) => { return(
                        <Movie key={movie.Key} movieDetail={movie} />
                    )})
                }</div>
            </div>
        )
    }
}

export default MainComponent;