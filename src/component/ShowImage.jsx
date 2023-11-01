import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const ShowImage = ({ item, index }) => {
    return (
        <>
            <Draggable draggableId={item.id} index={index}>
                {
                    (provided) => 
                    (
                    <figure className={`relative ${index == 0 && 'col-span-2 row-span-2'} group`} {...provided.dragHandleProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <img className='cursor-pointer rounded-lg border-2 border-zinc-500 bg-white hover:opacity-20 hover:scale-105 duration-700 ' src={item.image} alt="" />
                    <div className='absolute bg-white h-5 w-5 rounded-md top-3 left-3 opacity-0 group-hover:opacity-100'></div>
                </figure>)}
            </Draggable>
        </>
    );
};

ShowImage.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};


export default ShowImage;
