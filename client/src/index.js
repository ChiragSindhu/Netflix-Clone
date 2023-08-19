import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import HomePage from './routes/HomePage/index.js';
import SettingPage from './routes/SettingPage/index.js';
import MoviePage from './routes/MoviePage/index.js';
import Seasons from './routes/Seasons/index.js';
import Player from './routes/Player/index.js';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/Home" /></Route>
        <Route exact path='/Home' component={HomePage} />
        <Route exact path='/Setting' component={SettingPage} />
        <Route exact path='/Movie' component={MoviePage} />
        <Route exact path='/Watch' component={Player} />
        <Route exact path='/Seasons' component={Seasons} />
      </Switch>
    </Router>
  </React.StrictMode>
);
