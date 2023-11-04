import PropTypes from "prop-types";

const CheckedCondition = ({ handleAllChange, selectedImages, handleDelete }) => {
    return (
        <div className="sticky pb-4 flex flex-col md:flex-row gap-3 justify-between items-center py-2">
            <div className="space-x-3">
                <input
                    className={`checkbox bg-neutral h-5 w-5 rounded-md top-3 left-3 opacity-100`}
                    type="checkbox"
                    name="selectedImages"
                    checked={selectedImages.length !== 0 ? true : false}
                    onChange={handleAllChange}
                />
                <label htmlFor="checkbox">
                    {selectedImages.length !== 0 ? (
                        <>
                            {selectedImages.length} image
                            {selectedImages.length !== 1 ? "s" : ""} Selected
                        </>
                    ) : (
                        <>No Image Selected</>
                    )}
                </label>
            </div>
            <div>
                <button
                    onClick={handleDelete}
                    className={`btn btn-sm btn-error hover:bg-red-700 hover:border-2 hover:border-white ${selectedImages.length === 0 && 'opacity-0'}`}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

CheckedCondition.propTypes = {
    handleAllChange: PropTypes.func.isRequired,
    selectedImages: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default CheckedCondition;
