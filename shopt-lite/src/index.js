import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header/Header';
import Home from './pages/Home/Home.jsx';
import {createStore} from 'redux';
import allReducers from './redux/reducers/index.js';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    	<BrowserRouter>
    		<Header />
    		<Switch>
    			<>
    				<Route exact path="/" component={Home} />
    			</>
    		</Switch>
    	</BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
