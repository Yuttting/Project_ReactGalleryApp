import React, { PureComponent } from 'react';
import myApiKey from '../config';
import Photo from './Photo';
import NotFound from './NotFound';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class SearchResults extends PureComponent {
    state = {
        results: [],
        photos: [],
    }
    
    searchAndDisplay = (query) => {
        Promise.all([
            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
           ])
             .then(([data]) => {this.setState({
               results: data.data.photos.photo,
               loading: false,
             });
             if(this.state.results.length > 0) {
               this.setState({
                   photos: this.state.results.map( photo => 
                       <Photo 
                           url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                           key={photo.id} 
                           alt={photo.title}
                       />
                   )})
               } else {
                   this.setState({
                   photos: <NotFound />
               })
               }    
           }
             )
             .catch(error => {
               console.log('Error fetching and parsing data', error)
             });
    }
   

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.match.params.query !== this.props.match.params.query) {
            this.searchAndDisplay(this.props.match.params.query)}
    }    
    
    componentDidMount () {
        this.searchAndDisplay(this.props.match.params.query)
     }

    
    render() {
        return (
        
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    {this.state.photos}
    
                </ul>
            </div>
        )
    }
    

}


export default withRouter(SearchResults);