import React, { Component } from 'react';

import './index.css';
import NavSetting from '../components/leftNavSetting.js';
import SearchBar from '../components/searchBar.js';
import MainComponent from './main.js'

class HomePage extends Component{
    componentDidMount = () => {
        document.title = "Netflix"

        var m_autoPlayNextEpisode = localStorage.getItem('autoplaynextepisode');
        
        if(m_autoPlayNextEpisode === null || m_autoPlayNextEpisode === undefined)
        {
            console.log("Fresh User. Setting up default values.");
            localStorage.setItem('autoplaynextepisode','true');
            localStorage.setItem('autoplaypreviews','true');
            localStorage.setItem('language','Hindi');
            localStorage.setItem('subtitlelanguage', 'English');
            localStorage.setItem('datausage','Auto');
            localStorage.setItem('theme','Light Theme');

            document.documentElement.className = "LightTheme";
        }

        if(document.documentElement.className.length === 0)
        {
            document.documentElement.className = localStorage.getItem('theme').replace(' ','');
        }
    }

    render(){
        return(
            <div className='main'>
                <NavSetting />
                <div className='mainRight'>
                    <SearchBar />
                    <MainComponent />
                </div>
            </div>
        )
    }
}

export default HomePage;