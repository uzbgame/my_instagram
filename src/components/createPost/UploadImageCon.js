import React from 'react';

const UploadImage = ({ imageInput, handleUpload}) => {
    return (
        <div className="relative p-6 flex items-center justify-center" style={{width: 570, height: 570, zIndex: 10000}}>
            <div>
                <div className="mb-10 font-normal text-2xl">
                This is where you post your videos and photos.
                </div>
                <div className="flex justify-center">
                    <input
                        type="file"
                        className="hidden"
                        ref={imageInput}
                        onChange={handleUpload}
                    />
                    <button
                        type="button"
                        className="bg-blue-500 font-bold text-sm rounded text-white px-2 py-1 hover:bg-blue-800"
                        onClick={() => imageInput.current.click()}
                    >
                        from Desktop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadImage;
