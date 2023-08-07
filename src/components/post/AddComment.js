import React, { useState, useContext, useRef, useEffect } from 'react';
import { EMOJISCHAR } from '../../FileHelpers/Smilies';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import SmileSvg from '../createPost/SmileSvg';
import '../profile/profile.css';

const AddComment = ({ docId, comments, setComments, commentInput }) => {
    const [ comment, setComment ] = useState('');
    const emojiRef = useRef();
    const [ emoji, setEmoji ] = useState(false);
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const {
        user: { displayName }
    } = useContext(UserContext);

    useEffect(() => {
        function handleClickOutside(event) {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmoji(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef]);

    const handleSubmitComment = (event) => {
        event.preventDefault();

        setComments([{ displayName, comment }, ...comments]);
        setComment('');

        return firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
    }

    return (
        <div className=" h-12 border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5 relative"
                method="POST"
                onSubmit={(event) => comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()}
            >
                <div
                    className="flex items-center ml-3 cursor-pointer"
                    onClick={() => setEmoji(prev => !prev)}
                >
                    {emoji && (
                            <div className="emojiCon absolute bg-white border rounded-xl shadow-2xl"
                                style={{top: "50px"}}
                                ref={emojiRef}
                            >
                                <div className="emojiConDiv grid max-h-40 overflow-auto grid-cols-9 p-3">
                                    {EMOJISCHAR.map(emoji => (
                                        <div
                                            className="emojiConEmoji cursor-pointer"
                                            onClick={() => setComment(`${comment}${emoji}`)}
                                        >
                                            <span>{ emoji }</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="bi bi-emoji-smile"
                        fill="#000"
                        height="25px"
                        role="img"
                        viewBox="0 0 16 16"
                        width="45px">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path
                            d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z">
                        </path>
                    </svg>
                </div>
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="h-11 text-sm w-full mr-3 py-5 px-2"
                    type="text"
                    name="AddComment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    ref={commentInput}
                />
                <button
                    type="submit"
                    className="mt-2 border-2 w-20 rounded-xl text-sm font-bold text-purple-500"
                >
                    send
                </button>
            </form>
        </div>
    );
};

export default AddComment;
