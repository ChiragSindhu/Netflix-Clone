import React, { Component } from 'react';

class Movie extends Component{
    redirectMoviePage = ()=>{
        window.location.href = window.location.origin + '/Movie?movieKey=' + this.props.movieDetail.Key;
    }

    render(){
        return(
            <div className='container' onClick={this.redirectMoviePage}>
                <img id="movieThumbnail" alt="" src={this.props.movieDetail.ThumbnailMedium}/>
                <div id="movieName">{this.props.movieDetail.Name}</div>
                <div id="movieYear">{this.props.movieDetail.Year} • {this.props.movieDetail.Language} • {this.props.movieDetail.Rating} &#11088;</div>
                <div id="movieType">{this.props.movieDetail.Type}</div>
                <div id="movieQuality">{this.props.movieDetail.MaxQuality}</div>
            </div>
        )
    }
}

export default Movie;