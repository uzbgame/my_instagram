import React from 'react';

const Image = ({ src, caption }) => {
    return (
        <img className=''
            src={src}
            alt={caption}
        />
    );
};

export default Image;
