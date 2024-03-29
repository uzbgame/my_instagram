import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import UserPhotoModal from './UserPhotoModal';
import '../../RegisterPages/layouts.css'

const Photos = ({ photos }) => {
    const [ post, setPost ] = useState({});
    const [ showModal, setShowModal ] = useState(false);


    const showModalFn = (postItem) => {
        setPost(postItem);
        setShowModal(true);
    }

    return (
        <>
        <UserPhotoModal showModal={showModal} setShowModal={setShowModal} photo={post}/>
        <div className="h-16 border-t border-gray-500 mt-8 pt-1">
            <div className="flex items-center justify-evenly mt-10 ">
                {!photos ? (
                    <>
                        <Skeleton count={12}  width={420} height={400}/>
                    </>
                ) : photos.length > 0 ?  (
                    photos.map((photo) => (
                        <div key={photo.docId}>
                            <div
                                className="shadow-2xl relative group bg-light max-w-[10rem] h-[10rem] mt-1"
                                onClick={() => showModalFn(photo)}
                                >
                                <img
                                    src={photo.imageSrc}
                                    alt={photo.caption}
                                    className='w-full h-full object-cover'
                                />

                                <div className="absolute bottom-0 left-0 bg-gray-200 w-full justify-evenly items-center h-full bg-black opacity-50 group-hover:flex hidden">
                                    <p className="flex items-center text-white font-bold">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-8 mr-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {photo.likes.length}
                                    </p>
                                    <p className="flex items-center text-white font-bold">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-8 mr-4"
                                        >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                            clipRule="evenodd"
                                        />
                                        </svg>
                                        {photo.comments.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>

            {!photos || (photos.length === 0 && <p className="text-center text-2xl followersText">You haven't got any photos and videos.</p>)}
        </div>
        </>
    );
};

export default Photos;
