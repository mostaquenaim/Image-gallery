import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const ImageContext = createContext(null);

const ImageProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialImages, setInitialImages] = useState([]);

    useEffect(() => {
        fetch('/images.json')
            .then((res) => res.json())
            .then((data) => {
                setImages(data);
                setInitialImages(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const info = {
        images,
        setImages,
        loading,
        setLoading,
        initialImages,
        setInitialImages
    };

    return (
        <ImageContext.Provider value={info}>
            {children}
        </ImageContext.Provider>
    );
};

ImageProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ImageProvider;
