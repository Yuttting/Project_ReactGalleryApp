import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search';
import Nav from './components/Nav';
import myApiKey from './config';
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';


class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.performSearch(); 
  }

  performSearch = (apiKey = myApiKey, query='park') => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }

  render() {
    //console.log(this.state.photos);
    return (
      <BrowserRouter>
        <div className="container">
          <Search onSearch={this.performSearch} />
          {/* <Route path='/search/:query' render={() => <Search onSearch={this.performSearch}/>} /> */}
          <Nav />
          {
            (this.state.loading)? <p>Loading...</p> :  <PhotoContainer data={this.state.photos} />
          }
          <Switch>
            <Route path='/cats' render={()=> <Search onSearch={this.performSearch(myApiKey, 'cats')} />} />
            <Route path='/dogs' render={()=> <Search onSearch={this.performSearch(myApiKey, 'dogs')} />} />
            <Route path='/birds' render={()=> <Search onSearch={this.performSearch(myApiKey, 'birds')} />}/>
            {/* <Route component={404} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
