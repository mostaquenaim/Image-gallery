import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import "animate.css";
import ModalComp from "./ModalComp";
import { ThemeContext } from "../Contexts/ThemeProvider";
import { ImageContext } from "../Contexts/ImageProvider";
import LoadingComp from "./LoadingComp";
import CheckedCondition from "./CheckedCondition";
import ShowImage from "./ShowImage";
import NoImageMessage from "./NoImageMessage";

const Images = () => {
    // Retrieve data from contexts
    const { images, setImages, loading, setInitialImages } = useContext(
        ImageContext
    );
    const { theme } = useContext(ThemeContext);

    // State variables
    const [selectedImages, setSelectedImages] = useState([]);
    const [showDeletionAnimation, setShowDeletionAnimation] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    // Open modal with the selected image
    const openModal = (image) => {
        setIsModalOpen(true);
        setModalImage(image);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage("");
    };

    // Handle image selection
    const handleSelectImage = (id) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(id)) {
                return prevSelectedImages.filter((imageId) => imageId !== id);
            } else {
                return [...prevSelectedImages, id];
            }
        });
    };

    // Handle drag and drop image reordering
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, draggedImage);

        setImages(updatedImages);
    };

    // Handle selecting/deselecting all images
    const handleAllChange = () => {
        if (selectedImages.length === 0) {
            const allImageIds = images.map((item) => item.id);
            setSelectedImages(allImageIds);
        } else {
            setSelectedImages([]);
        }
    };

    // Handle deleting selected images
    const handleDelete = () => {
        Swal.fire({
            title: "Delete selected images?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setShowDeletionAnimation(selectedImages);

                // Wait for the animation to complete before actually removing images
                setTimeout(() => {
                    const updatedImages = images.filter(
                        (item) => !selectedImages.includes(item.id)
                    );
                    setInitialImages(updatedImages);
                    setImages(updatedImages);
                    setSelectedImages([]);
                    setShowDeletionAnimation([]);
                }, 1000); // Adjust the duration of the animation
            }
        });
    };

    return (
        <div data-theme={theme} className="mx-10 pt-10 pb-10 md:px-20">
            {/* Page title */}
            <h1 className="text-xl md:text-3xl lg:text-6xl text-center text-bold py-4 border-b-2">
                Gallery
            </h1>

            {loading ? (
                // Display loading spinner if data is being loaded
                <LoadingComp />
            ) : images.length !== 0 ? (
                // Render the image gallery if there are images to display
                <>
                    {/* Display checkbox and Delete button conditionally */}
                    <CheckedCondition
                        handleAllChange={handleAllChange}
                        selectedImages={selectedImages}
                        handleDelete={handleDelete}
                    />
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="images" direction="horizontal">
                            {(provided) => (
                                // Display the grid of images with drag-and-drop support
                                <div
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {images.map((item, index) => (
                                        <Draggable
                                            key={item.id.toString()}
                                            draggableId={item.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                // Display individual image with checkbox, image, and labels
                                                <figure
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`relative form-control bg-neutral rounded-lg ${showDeletionAnimation.includes(item.id)
                                                            ? "animate__animated animate__fadeOut"
                                                            : ""
                                                        } ${index === 0 ? "col-span-2 row-span-2" : ""} group`}
                                                >
                                                    {/* Render the individual image */}
                                                    <ShowImage
                                                        handleSelectImage={handleSelectImage}
                                                        selectedImages={selectedImages}
                                                        openModal={openModal}
                                                        item={item}
                                                    />
                                                </figure>
                                            )}
                                        </Draggable>
                                    ))}

                                    {/* Add a button for adding more images */}
                                    <div className="bg-white flex text-center rounded-lg cursor-pointer">
                                        <img
                                            className="hover:opacity-80 hover:scale-[1.01] duration-300"
                                            src="https://i.ibb.co/dKtmKd0/396915-200.png"
                                            alt=""
                                        />
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </>
            ) : (
                // Display a message if there are no images
                <NoImageMessage />
            )}

            {/* Display the modal for viewing images */}
            <ModalComp isOpen={isModalOpen} image={modalImage} onClose={closeModal} />
        </div>
    );

};

export default Images;