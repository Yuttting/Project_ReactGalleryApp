import React from 'react';

const Photo = ({url, alt}) => {
    return (
        <li>
            <img src={url} alt={alt} />
        </li>
    )
}

export default Photo;