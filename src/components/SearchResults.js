import React, { PureComponent } from 'react';
import myApiKey from '../config';
import Photo from './Photo';
import NotFound from './NotFound';
import axios from 'axios';
import { withRouter } from "react-router-dom";

// const SearchResults = ({match}, props) => {
//     let query = match.params.query;
//     let results;
//     let photos;
//     let loading = true;

//     useEffect(
//         () => {
//             Promise.all([
//                 axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
//             ])
//                 .then(([data]) => {
//                 results = data.data.photos.photo;
//                 loading = false;
//                 if(results.length > 0) {
//                     photos = results.map( photo => 
//                         <Photo 
//                             url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
//                             key={photo.id} 
//                             alt={photo.title}
//                         />
//                     )
//                 //console.log(this.state.photos)
//                 } else {photos = <NotFound /> }} )  
//                 .catch(error => {console.log('Error fetching and parsing data', error)});
//         }, [query]
//     );

//     return (
//         <div className="photo-container">
//             <h2>Results</h2>
//             <ul>
//                 {photos}
//             </ul>
//         </div>
//     )
// }


class SearchResults extends PureComponent {
    state = {
        //query: this.props.match.params.query,
        results: [],
        photos: [],
        //active: true
    }
    
    searchAndDisplay = (query) => {
        // this.setState({
        //     active: true
        // })
        Promise.all([
            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
           ])
             .then(([data]) => {this.setState({
               results: data.data.photos.photo,
               loading: false,
               //active: false
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
            //    console.log(this.state.photos)
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
        // console.log(prevProps.match.params.query)
        // console.log(prevState);
        // console.log(this.state.query)

        if (prevProps.match.params.query !== this.props.match.params.query) {
            this.searchAndDisplay(this.props.match.params.query)}
            // this.setState({
            //     active: false
            // })
    }    
    
    componentDidMount () {
        this.searchAndDisplay(this.props.match.params.query)
     }
    // componentDidMount() {
        // this.setState({
        //     results: this.props.onSearch(myApiKey, this.state.query)
        // })
        // console.log(this.state.results)

    // componentWillReceiveProps(nextProps, prevProps) {
    //     console.log(prevProps, nextProps);
    //     let query = nextProps.match.params.query;
    //     Promise.all([
    //      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${myApiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    //     ])
    //       .then(([data]) => {this.setState({
    //         results: data.data.photos.photo,
    //         loading: false
    //       });
    //       if(this.state.results.length > 0) {
    //         this.setState({
    //             photos: this.state.results.map( photo => 
    //                 <Photo 
    //                     url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
    //                     key={photo.id} 
    //                     alt={photo.title}
    //                 />
    //             )})
    //         console.log(this.state.photos)
    //         } else {
    //             this.setState({
    //             photos: <NotFound />
    //         })
    //         }    
    //     }
    //       )
    //       .catch(error => {
    //         console.log('Error fetching and parsing data', error)
    //       });
    //   }


    
    render() {
        //console.log(this.state.photos)
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

// class SearchResults extends Component {
//     sstate = {
//         query: [],
//         results: [],
//         photos:[],
//         active: true
//     }
   
   
//     // updateResults = (prevState) => {
//     //     this.props.onSearch(myApiKey, this.state.query);
//     // }

//     // updatePhotos(prevState){
//     //     console.log(this.props);
//     //     console.log(prevState);
//     //     // console.log(this.props.match.params.query);
//     //     if(prevState.match.params.query !== this.state.query && prevState.match.params.query !== [] && this.props.match.params.query !== []) {
//     //         this.setState({
//     //             query: prevState.match.params.query,
//     //             results: this.updateResults(),
//     //             active:false
//     //         });
//     //         console.log(this.state.results);
//     //     } else {
//     //         this.setState({
//     //             results: this.props.data,
//     //             active: false
//     //         });
//     //     console.log(this.state.results);
//     //     } 
    
//     // }

    
//     // componentDidMount() {
//     //     this.handlePhotoDisplay();  
//     // }

//     // componentDidUpdate(prevState) {
//     //     // if(this.state.active){
//     //     //     this.updatePhotos(prevState);
//     //     // }
//     //     console.log(prevState)
//     //     console.log(this.state)
//     // }
//     // componentDidUpdate(prevProps, prevState) {
//     //     const { query } = this.props;
//     //     if (prevProps.query !== query) {
//     //         //this.props.onSearch(myApiKey, this.state.query);
//     //         console.log(query)
//     //     } else 
//     // }

//     handlePhotoDisplay = () => {
//         // console.log(this);
//         // console.log(this.props);
//         if(this.state.results.length > 0) {
//             this.setState({
//                 photos: this.state.results.map(photo => 
//                     <Photo 
//                         url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
//                         key={photo.id} 
//                         alt={photo.title}
//                     />)
//             })
//         } else {
//             this.setState({
//                 photos: <NotFound />
//             })
//         }

//     }
  

//     render (){
        
//         return (
//             <div className="photo-container">
//             <h2>Results</h2>
//             <ul>
//                 {/* {this.state.photos} */}
//             </ul>
//         </div>
//         )
//     }
// }

export default withRouter(SearchResults);