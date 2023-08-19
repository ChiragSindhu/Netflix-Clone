import React, { Component } from 'react';

import './search.css';

class SearchBar extends Component{
    render(){
        return(
            <div className='searchBarContainer'>
                <input type="text" id="movieSearch" placeholder='Search' />
            </div>
        )
    }
}

export default SearchBar;