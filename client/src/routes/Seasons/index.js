import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NavSetting from '../components/leftNavSetting.js';

import './index.css';

class Seasons extends Component{
    constructor(){
        super();

        this.state = {
            selectedSeason: 0
        }

        this.rightComponent = React.createRef();
    }

    componentDidMount(){
        this.EnteranceRightEpisodeElement();
        if(document.documentElement.className.length === 0)
        {
            document.documentElement.className = localStorage.getItem('theme').replace(' ','');
        }
    }


    redirectPlayer = (event) => {
        var Episode = event.target.className;
        var Season = this.state.selectedSeason;
        console.log("E:" + Episode,"S:" + Season);

        var newSeriesDetail = this.props.location.state;
        var selectEPdetails = this.props.location.state.Seasons[Season][Episode];
        var WatchUrlObject = {};
        for (let index = 0; index < Object.keys(selectEPdetails).length; index++) {
            if(!Object.keys(selectEPdetails)[index].includes('meta')){
                WatchUrlObject[Object.keys(selectEPdetails)[index]] = selectEPdetails[Object.keys(selectEPdetails)[index]];
            }
        }

        //console.log(WatchUrlObject);
        newSeriesDetail['WatchUrl'] = WatchUrlObject;
        newSeriesDetail['Subtitles'] = selectEPdetails.metaSubtitle;

        //console.log(selectEPdetails);
        //console.log(newSeriesDetail);

        this.props.history.push({
            pathname: "/Watch",
            state: newSeriesDetail
        });

        //window.location.href = "http://localhost:3000/Watch";
    }

    handleSeasonElementSelect = (event) => {
        if(Number.isNaN(parseInt(event.target.className)))
            return;
    
        this.setState({selectedSeason : event.target.className});
        this.EnteranceRightEpisodeElement();
    }

    EnteranceRightEpisodeElement = () =>{
        this.rightComponent.current.style.animation = "initRightElement 0.3s 1";
        
        setTimeout(()=>{this.rightComponent.current.style.animation = ""}, 400);
    }

    handleRightEpisodeElement = ()=> {
        try{
            if(this.props.location.state.Seasons[this.state.selectedSeason].length === 0){
                return(
                    <div> No Episodes found.</div>
                )
            }else{
            return(
            this.props.location.state.Seasons[this.state.selectedSeason].map((episodes,index)=>{
                return(
                    <div key={index} id="rightEpisodeElement">
                        <div id="TitleAndPlayBtn">
                            <div id="rightEpisodeTitle">E{index+1} "{episodes.metaName}"</div>
                            <input type="button" value="Play" className={index} id="buttonPlay" onClick={this.redirectPlayer} />
                            <input type="button" value="Watch Later" id="buttonDownloadEpisode" />
                        </div>
                        <div id="rightDescription">{episodes.metaDescription}</div>
                        <div id="rightTime">({episodes.metaDuration})</div>
                    </div>
            )}))};
        }catch(EpisodeErr){console.warn("EpisodeErr: " + EpisodeErr.message)}
    }

    render(){
        return(
            <div className='main'>
                <NavSetting />

                <div id="mainComponent">
                    <div id="leftComponent">
                        <div id="upperLeftComponent">
                             <div id="movieTitle">{this.props.location.state.Name}</div>
                            <div style={{padding: '0px 0px 5px 2.5rem', width: '60%', display: 'flex', flexDirection: 'row'}}>
                                <div id="movieDetailsSeasons" style={{width:'15%'}}>{this.props.location.state.Year}</div>
                                <div id="movieDetailsSeasons" style={{width:'25%'}}> ⭐ {this.props.location.state.Rating}</div>
                                <div id="movieDetailsSeasons" style={{width:'60%'}}>{this.props.location.state.Time}</div>
                            </div>
                        </div>

                        <div id="lowerLeftCompoment">
                            {
                                this.props.location.state.Seasons.map((seasons,index) => {
                                return(
                                    <div key={index} id="leftSeasonElement" className={parseInt(this.state.selectedSeason) === parseInt(index) ? "leftSeasonElementSelected" : ""} onClick={this.handleSeasonElementSelect}>
                                        <div className={index} id="leftSeasonTitle">Season {index + 1}</div>
                                        <div className={index} id="leftSeasonEpisode">{seasons.length} episodes</div>
                                    </div>
                                )})
                            }
                        </div>
                       
                    </div>
                    <div ref={this.rightComponent} id="rightComponent">
                        {this.handleRightEpisodeElement()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Seasons);