import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search';
import Nav from './components/Nav';
import myApiKey from './config';
import PhotoContainer from './components/PhotoContainer';
import ErrorRoute from './components/ErrorRoute';
import SearchResults from './components/SearchResults';


class App extends PureComponent {
  state = {
      photos: [],
      loading: true,
      catPhotos: [],
      dogPhotos: [],
      birdPhotos: []
    }

  componentDidMount() {
    Promise.all([
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`),
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`),
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=birds&per_page=24&format=json&nojsoncallback=1`),
      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=parks&per_page=24&format=json&nojsoncallback=1`)
    ])
      .then(([data1, data2, data3,data4]) => this.setState({
        catPhotos: data1.data.photos.photo,
        dogPhotos: data2.data.photos.photo,
        birdPhotos: data3.data.photos.photo,
        photos: data4.data.photos.photo,
        loading: false
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }

  performSearch = (apiKey=myApiKey, query='parks') => {
    this.setState({
      loading: true
    });

    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
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

  loading = (data) => {
    return (
      (this.state.loading)? <p>Loading...</p> :  <PhotoContainer data={data} />
    )
  }


  render() {
  //console.log(this.state.catPhotos)
    return (
        <BrowserRouter>
          <div className="container">
            <Search onSearch={this.performSearch} />
            <Nav />
            <Switch>
              <Route exact path='/' render={() => this.loading(this.state.photos)} />
              <Route path='/search/:query' render={() => (this.state.loading)? <p>Loading...</p> :  <SearchResults />} />
              {/* <Route path='/search/:query' component={SearchResults} /> */}
              <Route path='/cats' render={()=> this.loading(this.state.catPhotos)} />
              <Route path='/dogs' render={()=> this.loading(this.state.dogPhotos)} />
              <Route path='/birds' render={()=> this.loading(this.state.birdPhotos)}/>
              <Route component={ErrorRoute} />
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
