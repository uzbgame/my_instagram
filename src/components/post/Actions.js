import React, { useContext, useState } from 'react';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';
import '../../RegisterPages/layouts.css';
import IoChatbubbleOutline from 'react-icons/io'

const Actions = ({ docId, totalLikes, likedPhoto, handleFocus }) => {
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext);
    const [ toggleLiked, setToggleLiked ] = useState(likedPhoto);
    const [ likes, setLikes ] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked((toggleLiked) => !toggleLiked);

        await firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    }

    return (
        <>
        <div className="flex justify-between p-4">
            <div className="flex">
                <svg
                    onClick={handleToggleLiked}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    tabIndex={1}
                    
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    className={`like w-10 mr-4 like select-none cursor-pointer ${
                        toggleLiked ? "like fill-red-500 text-red-500" : "text-black"
                    }`}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4 4.1 2 000 6.194L12 20.384l7.772-7.682a4.5 4.5 0 00-6.354-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203"
                    />
                </svg>
                <svg
                    onClick={handleFocus}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    
                    strokeWidth={0}
                    stroke="currentColor"
                    className="w-8 text-black-light select-none cursor-pointer">
                    <path fill='none' d="M0 0h24v24H0z"></path>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176zm.29-2.113l.653.35A7.955 7.955 0 0 0 12 20a8 8 0 1 0-8-8c0 1.334.325 2.618.94 3.766l.349.653-.655 2.947 2.947-.655z"
                        />
                </svg>
                <svg
                    stroke-linejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-8 select-none cursor-pointer ml-3">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon
                       points="22 2 15 22 11 13 2 9 22 2"
                        />
                </svg>
            </div>
        </div>
        <div className="p-4 py-0">
            <p className="font-bold">
                {likes === 1 ? `${likes} like` : `${likes} likes`}
            </p>
        </div>
        </>
    );
};

export default Actions;
