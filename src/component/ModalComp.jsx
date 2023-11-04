import { useContext } from 'react';
import PropTypes from 'prop-types'; 
import { ThemeContext } from '../Contexts/ThemeProvider';

const ModalComp = ({ isOpen, image, onClose }) => {
    const { theme } = useContext(ThemeContext);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            data-theme={theme}
            className="fixed bottom-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="absolute w-full h-full bg-black opacity-80" onClick={onClose}></div>
            <div
                data-aos="zoom-in-up"
                className="modal-container p-4 bg-white rounded-lg z-50">
                <img src={image} alt="Modal" className='max-h-[600px] max-w-full' />
            </div>
        </div>
    );
};

ModalComp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalComp;
