import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Swal from 'sweetalert2';
import 'animate.css';

const Images = () => {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [showDeletionAnimation, setShowDeletionAnimation] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/images.json')
            .then((res) => res.json())
            .then((data) => setImages(data))
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const handleSelectImage = (id) => {
        if (selectedImages.includes(id)) {
            setSelectedImages(selectedImages.filter((imageId) => imageId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, draggedImage);

        setImages(updatedImages);
    };

    const handleAllChange = () => {
        if (selectedImages.length === 0) {
            const allImageIds = images.map((item) => item.id);
            setSelectedImages(allImageIds);
        } else {
            setSelectedImages([]);
        }
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Delete selected images?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {

                setShowDeletionAnimation(selectedImages)

                // Wait for the animation to complete before actually removing images
                setTimeout(() => {
                    const updatedImages = images.filter((item) => !selectedImages.includes(item.id));
                    setImages(updatedImages);
                    setSelectedImages([]);
                    setShowDeletionAnimation([]);
                }, 1000); // Adjust the duration of the animation
            }
        });
    };


    return (
        <div className="mx-10 pt-20 pb-10">
            <h1 className="text-xl md:text-3xl lg:text-6xl text-center text-bold my-16 py-4 border-b-2">Gallery</h1>

            {
                loading ?
                    <span className="text-center mx-auto loading loading-bars loading-lg"></span>
                    :
                    images.length !== 0 ?
                        <>
                            {
                                selectedImages.length !== 0 ? (
                                    <div className="sticky pb-4 flex justify-between items-center">
                                        <div className="space-x-3">
                                            <input
                                                className={`checkbox bg-white h-5 w-5 rounded-md top-3 left-3 opacity-100`}
                                                type="checkbox"
                                                name="selectedImages"
                                                checked
                                                onChange={handleAllChange}
                                            />
                                            <label htmlFor="checkbox">
                                                {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} Selected
                                            </label>
                                        </div>
                                        <div>
                                            <button onClick={handleDelete} className="btn btn-sm btn-error">Delete</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="pb-4 space-x-3">
                                            <input
                                                className={`checkbox bg-white h-5 w-5 rounded-md top-3 left-3 opacity-100`}
                                                type="checkbox"
                                                name="selectedImages"
                                                onChange={handleAllChange}
                                            />
                                            <label htmlFor="checkbox">No Image Selected</label>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                )
                            }
                            < DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="images" direction="horizontal">
                                    {(provided) => (
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
                                                        <figure
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`relative form-control bg-black rounded-lg ${showDeletionAnimation.includes(item.id) ? 'animate__animated animate__fadeOut' : ''
                                                                } ${index === 0 ? 'col-span-2 row-span-2' : ''} group`}
                                                        >
                                                            <label className="cursor-pointer label p-0">
                                                                <img
                                                                    src={item.image}
                                                                    alt=""
                                                                    className={`label-text cursor-pointer rounded-lg border-2 border-zinc-500 bg-white hover:opacity-20 hover:scale-105 duration-500 ${selectedImages.includes(item.id) && 'opacity-20 scale-105'}`}
                                                                />
                                                                <span className={`absolute w-full text-center bottom-3 font-semibold text-sm md:text-base lg:text-lg text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-5 duration-500 ${selectedImages.includes(item.id) && 'opacity-100 -translate-y-5'}`}>{item.name}</span>
                                                                <input
                                                                    className={`opacity-0 group-hover:opacity-100 checkbox absolute bg-white h-5 w-5 rounded-md top-3 left-3 ${selectedImages.includes(item.id) && 'opacity-100'}`}
                                                                    type="checkbox"
                                                                    id={item.id.toString()}
                                                                    name="selectedImages"
                                                                    checked={selectedImages.includes(item.id)}
                                                                    onChange={() => handleSelectImage(item.id)}
                                                                />
                                                            </label>
                                                        </figure>
                                                    )}
                                                </Draggable>
                                            ))}

                                            <div className="bg-white flex text-center rounded-lg cursor-pointer">
                                                <img className=" hover:opacity-80 hover:scale-[1.01] duration-300" src="https://i.ibb.co/dKtmKd0/396915-200.png" alt="" />
                                            </div>

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </>
                        :
                        <div className="text-center text-xl md:text-3xl lg:text-6xl flex gap-3 justify-center">
                            NO IMAGE TO SHOW! 
                            <div className="animate__animated animate__bounce animate__infinite">
                                <span role="img" aria-label="crying emoji">😢</span>
                            </div>
                        </div>
            }
        </div >
    );
};

export default Images;
