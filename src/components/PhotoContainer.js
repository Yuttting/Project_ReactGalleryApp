import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';

import { withRouter } from "react-router-dom"

const PhotoContainer = (props) => {
    let results = props.data;
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

export default withRouter(PhotoContainer);