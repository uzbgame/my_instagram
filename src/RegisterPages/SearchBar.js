import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../Services/firebase';
import { Link } from "react-router-dom";
import './layouts.css'

const SearchBar = ({ searchInput }) => {
    const [ users, setUsers ] = useState([]);
    const [ filteredItems, setFilteredItems ] = useState([]);

    const getUsers = async () => {
        const result = await getAllUsers();
        setUsers(result);
    }

    const searchUsers = () => {
        if(searchInput.trim()) {
            const filteredArray = users.filter(item =>
                item.username.toLowerCase().includes(searchInput.toLowerCase())
            );

            setFilteredItems(filteredArray);
        } else {
            setFilteredItems([]);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        searchUsers();
    }, [searchInput]);

    return (
        <div
            className={!filteredItems.length && "h-full"}
        >
            {!filteredItems.length && (
                <div className="flex p-0 items-center justify-center h-full">
                    <p className="font-semibold">Enter the username</p>
                </div>
            )}
            {filteredItems.map(profile => (
                <Link to={`/${profile.username}`}>
                    <div
                        key={profile.userId}
                        className="flex items-center cursor-pointer mb-4"
                    >
                        <div className="w-10 h-10">
                            <img
                                className="w-full h-full rounded-full ml-2"
                                src={profile.avatarSrc}
                                alt=""
                            />
                        </div>
                        <div className="ml-4">
                            <span className="font-semibold">
                                { profile.username }
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchBar;
