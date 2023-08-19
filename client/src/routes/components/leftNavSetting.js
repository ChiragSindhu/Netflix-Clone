import React, { Component } from 'react';

import './leftNavSetting.css';

class NavSetting extends Component{
    redirectHome = () => {
        if(window.location.pathname !== "/Home")
            window.location.href = window.location.origin + '/Home';
    }

    redirectMovies = () => {
        if(window.location.pathname !== "/Movies")
            window.location.href = window.location.origin + '/Movies';
    }

    redirectTVShows = () => {
        if(window.location.pathname !== "/TVShows")
            window.location.href = window.location.origin + '/TVShows';
    }

    redirectSetting = () => {
        if(window.location.pathname !== "/Setting")
            window.location.href = window.location.origin + '/Setting';
    }

    render(){
        return(
            <div className='leftNavSetting'>
                <div id='navHeading'>Netflix</div>
                <div id='menuHeading'>Menu</div>
                <div id='menuContainer'>
                    <div className='containers' id="conatiner1" onClick={this.redirectHome}>Home</div>
                    <div className='containers' id="conatiner2" onClick={this.redirectMovies}>Movies</div>
                    <div className='containers' id="conatiner3" onClick={this.redirectTVShows}>TV Shows</div>
                    <div className='containers' id="conatiner4" onClick={this.redirectSetting}>Settings</div>
                </div>
                <div className='seperate'></div>
                <div id='menuHeading'>Misc</div>
                <div id='menuContainer'>
                    <div className='containers' id="conatiner1">Help Center</div>
                    <div className='containers' id="conatiner2">Discord</div>
                </div>
            </div>
        )
    }
}

export default NavSetting;