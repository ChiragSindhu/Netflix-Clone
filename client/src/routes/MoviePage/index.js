import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NavSetting from '../components/leftNavSetting.js';
import SearchBar from '../components/searchBar.js';

import './index.css';

class MoviePage extends Component{
    constructor(){
        super();

        this.state = {
            movieDetail: []
        }

        this.mainRightElement = React.createRef();
        this.movieContainer = React.createRef();
    }

    componentDidMount = () => {
        fetch(window.location.href.replace('3000','5000')).then(response => { response.json().then(movieDetail => { this.setState( { movieDetail: movieDetail[0] }); document.title = this.state.movieDetail.Name + " " + this.state.movieDetail.Year;})});

        if(document.documentElement.className.length === 0)
        {
            document.documentElement.className = localStorage.getItem('theme').replace(' ','');
        }

        setTimeout(()=>{
            this.handleOnStartScroll();
        }, 100);
    }

    redirectPlayer = () => {
        this.props.history.push({
            pathname: "/Watch",
            state: this.state.movieDetail
        });

        //window.location.href = "http://localhost:3000/Watch";
    }

    redirectSeasons = () => {
        this.props.history.push({
            pathname: "/Seasons",
            state: this.state.movieDetail
        });
    }

    handleOnStartScroll = () => {
        const scrollValue = this.movieContainer.current.offsetTop - this.movieContainer.current.offsetHeight * 0.35;
        this.mainRightElement.current.scrollTo(0, scrollValue);
    }

    render(){
        return(
            <div className='main'>
                <NavSetting />

                <div className='mainRight' ref={this.mainRightElement}>
                    <SearchBar />
                    <div className='movieDetailContainer' >
                        <img src={this.state.movieDetail.Banner} alt="" id="banner" />
                        <img src={this.state.movieDetail.ThumbnailMedium} alt="" id="thumbnail" />
                        <div id="movieContainer" ref={this.movieContainer}>
                            <div id="nameLanguageContainer">
                                <div id="name">{this.state.movieDetail.Name}</div>
                                <div style={{display: "flex", flexDirection: "row"}}>{
                                this.state.movieDetail.Language !== undefined 
                                ? this.state.movieDetail.Language.map(((lang,index) => {
                                    return(
                                        <div key={index} id="movieLanguage">{lang}</div>
                                    )
                                })) 
                                : <div></div>
                            }</div>
                            </div>
                            
                            <div id="categories">{
                                this.state.movieDetail.Category !== undefined 
                                ? this.state.movieDetail.Category.map(((category,index) => {
                                    return(
                                        <div key={index} id="category">{category}</div>
                                    )
                                })) 
                                : <div>Nothing to show.</div>
                            }</div>
                            <div id="movieSmallDetail">{this.state.movieDetail.Time} &#8226; {this.state.movieDetail.Release} &#8226; {this.state.movieDetail.Rating} &#11088;</div>
                            <div id="PlayAndDownload">
                                {this.state.movieDetail.Type === "Movie" ? <input type="button" value="Play" id="buttonPlay" onClick={this.redirectPlayer} /> : <input type="button" value="Seasons" id="buttonPlay" onClick={this.redirectSeasons} />}
                                <a target="_blank" rel="noreferrer" href={this.state.movieDetail.DownloadUrl} download><input type="button" value="Download" id="buttonDownload" /></a>
                            </div>
                            <div id="detailContaier">
                                <div id="Heading">Synopsis</div>
                                <div id="movieSynopsis">{this.state.movieDetail.Synopsis}</div>
                                <div id="Heading">Trailer</div>
                                <iframe id="movieTrailer" src={this.state.movieDetail.TrailerUrl} title="YouTube video player" frameBorder="0" allowFullScreen="0" ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MoviePage);