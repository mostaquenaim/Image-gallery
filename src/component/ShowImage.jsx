import PropTypes from 'prop-types';

const ShowImage = ({ selectedImages, item, openModal, handleSelectImage }) => {
    return (
        <label className="cursor-pointer label p-0">
            <img
                src={item.image}
                alt=""
                className={`label-text cursor-pointer rounded-lg border-2 border-zinc-500 bg-white hover:opacity-20 hover:scale-105 duration-500 ${selectedImages.includes(item.id)
                    ? "opacity-20 scale-105"
                    : ""
                    }`}
            />
            <div
                className={`absolute w-full text-center bottom-3 font-semibold text-sm md:text-base lg:text-lg text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-5 duration-500 ${selectedImages.includes(item.id)
                    ? "opacity-100 -translate-y-5"
                    : ""
                    }`}
            >
                <button
                    className="btn btn-sm"
                    onClick={() => openModal(item.image)}
                >
                    {item.name}
                </button>
            </div>
            <input
                className={`opacity-0 group-hover:opacity-100 checkbox absolute bg-white h-5 w-5 rounded-md top-3 left-3 ${selectedImages.includes(item.id)
                    ? "opacity-100"
                    : ""
                    }`}
                type="checkbox"
                id={item.id.toString()}
                name="selectedImages"
                checked={selectedImages.includes(item.id)}
                onChange={() => handleSelectImage(item.id)}
            />
        </label>
    );
};

// Define PropTypes for the component to document the expected props
ShowImage.propTypes = {
    selectedImages: PropTypes.array.isRequired, // Array of selected images
    item: PropTypes.object.isRequired, // Object representing an image
    openModal: PropTypes.func.isRequired, // Function to open a modal with an image
    handleSelectImage: PropTypes.func.isRequired, // Function to handle image selection
};

export default ShowImage;
