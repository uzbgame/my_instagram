import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getUserByUsername } from '../../Services/firebase';
import { useNavigate } from 'react-router-dom';
import { NOT_FOUND } from './../../constantsFile/routes';
import Header from './../../components/profile/MainUser';
import UserProfile from './../../components/profile/UserProfile';

const UserPage = () => {
    const { username } = useParams();
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserExists = async () => {
            const [user] = await getUserByUsername(username);
            if (user?.userId) {
                setUser(user);
            } else {
                navigate(NOT_FOUND);
            }
        }

        checkUserExists();
    }, [username, navigate]);

    return user ? (
        <div className="bg-gray-background ">
            <div className="mx-auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : (
        null
    );
};

export default UserPage;
