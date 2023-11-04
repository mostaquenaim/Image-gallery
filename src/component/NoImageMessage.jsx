
const NoImageMessage = () => {
    return (
        <div className="text-center text-xl md:text-3xl lg:text-6xl flex gap-3 justify-center">
            NO IMAGE TO SHOW!
            <div className="animate__animated animate__bounce animate__infinite">
                <span role="img" aria-label="crying emoji">😢</span>
            </div>
        </div>
    );
};

export default NoImageMessage;