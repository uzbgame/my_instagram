import { useState, useContext, useEffect } from "react";
import { getUserByUserId } from "../Services/firebase";
import UserProfile from './UserProfile';

export default function useUserProfile() {
    const [ activeUser, setActiveUser ] = useState({});
    const { useUser } = useContext(UserProfile);

    async function getUserObjByUserId() {
        const [response] = await getUserByUserId(useUser.uid);
        setActiveUser(response);
    }

    const updateProfile = () => {
        getUserObjByUserId();
    }

    useEffect(() => {
        if(useUser?.uid) {
            getUserObjByUserId();
        }
    }, [useUser])

    return { useUser: activeUser, updateProfile };
}
