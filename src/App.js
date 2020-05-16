import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search';
import Nav from './components/Nav';
import myApiKey from './config';
import PhotoContainer from './components/PhotoContainer';
import ErrorRoute from './components/ErrorRoute';


class App extends PureComponent {

  state = {
      photos: [],
      loading: true,
      catPhotos: [],
      dogPhotos: [],
      birdPhotos: []
    }

  componentDidMount() {
    this.performSearch(); 
    this.getCatPhotos();
    this.getDogPhotos();
    this.getBirdPhotos();
  }

  performSearch = (apiKey=myApiKey, query='parks') => {
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

  getCatPhotos = (apiKey=myApiKey) => {
    let catPhotos;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            catPhotos: response.data.photos.photo,
            loading: false
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error)
        });
        return catPhotos;
  }

  getDogPhotos = (apiKey=myApiKey) => {
    let dogPhotos;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            dogPhotos: response.data.photos.photo,
            loading: false
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error)
        });
        return dogPhotos;
  }

  getBirdPhotos = (apiKey=myApiKey) => {
    let birdPhotos;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=birds&per_page=24&format=json&nojsoncallback=1`)
        .then(response => {
          this.setState({
            birdPhotos: response.data.photos.photo,
            loading: false
          })
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error)
        });
        return birdPhotos;
  }

  loading = (data) => {
    return (
      (this.state.loading)? <p>Loading...</p> :  <PhotoContainer data={data} />
    )
  }

  render() {
    console.log(this.state.catPhotos);
    return (
        <BrowserRouter>
          <div className="container">
            <Search onSearch={this.performSearch}/>
            <Nav />
            <Switch>
              <Route exact path='/' render={() => {
                return (
                    // (this.state.loading)? <p>Loading...</p> :  <PhotoContainer data={this.state.photos} />
                    this.loading(this.state.photos)
                )
              }} />
              {/* <Route path='/search' render={() => {
                return (
                    this.loading(this.state.photos)
                )
              }}/> */}
              <Route path='/search/:q' render={()=> this.loading(this.state.photos)} />
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
