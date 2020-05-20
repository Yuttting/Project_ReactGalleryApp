import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

import { withRouter } from "react-router-dom"

const PhotoContainer = (props) => {
    //let query = match.params.query;
    let results = props.data;
    
    //let searchResults = props.onSearch(myApiKey, query);

    // if(query) {
    //     results = searchResults;
    //     console.log(searchResults)
    // } else {
    //     results = props.data;
    // }
    // console.log(searchResults)
    let photos;
    if(results.length > 0) {
        photos = results.map( photo => 
            <Photo 
                url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                key={photo.id} 
                alt={photo.title}
            />
        );
    } else {
        photos = <NotFound />
    }
    return (
        
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {photos}

            </ul>
        </div>
    )
}

// class PhotoContainer extends Component {
//     state = {
//         query: [],
//         results: [],
//         photos:[],
//         active: true
//     }

//     updateResults = (prevState) => {
//         this.props.onSearch(myApiKey, this.state.query);
//     }

//     updatePhotos(prevState){
//         console.log(this.props);
//         console.log(prevState);
//         // console.log(this.props.match.params.query);
//         if(prevState.match.params.query !== this.state.query && prevState.match.params.query !== [] && this.props.match.params.query !== []) {
//             this.setState({
//                 query: prevState.match.params.query,
//                 results: this.updateResults(),
//                 active:false
//             });
//             console.log(this.state.results);
//         } else {
//             this.setState({
//                 results: this.props.data,
//                 active: false
//             });
//         console.log(this.state.results);
//         } 
    
//     }

    
//     componentDidMount() {
//         this.handlePhotoDisplay();
        
//     }
//     componentDidUpdate(prevState) {
//         if(this.state.active){
//             this.updatePhotos(prevState);
//         }
//         // console.log(prevState)
//     }

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
//         //const {match} = this.props;
//         //console.log(this.state.query)
        
//         return (
//             <div className="photo-container">
//             <h2>Results</h2>
//             <ul>
//                 {this.state.photos}

//             </ul>
//         </div>
//         )
//     }
// }

export default withRouter(PhotoContainer);