import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import Avatar from 'react-avatar-edit';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  isUserFollowingProfile,
  toggleFollow,
} from "../../Services/firebase";
import './profile.css';
import img from './Profile-Icon-SVG-09856789.png';
import EditUserPage from "../../pages/UserPage/EditUserPage";

const Header = ({
  user: currentUser,
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
    avatarSrc,
  },
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;
  const [visible, setvisible] = useState(false); //dialogs
  // const [image, setimage] = useState("");
  const [imagecrop, setimagecrop] = useState(false);
  const [profile, setProfile] = useState([]) //store
  const [pview, setpiew] = useState(false); //imgCrop
  const [open, setOpen] = React.useState(false);

  const onCrop = (view) => {
    setpiew(view);
 }

  const onClose = () => {
    setpiew(null);
 }


 const saveCropImage = () => {
  setProfile([...profile, { pview }]);
  setimagecrop(false);
};

 const profileFinal = profile.map(item => item.pview);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  const handleClickToOpen = () => {
    setOpen(true);
 };

 const handleToClose = () => {
    setOpen(false);
 };
  
  

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-4">
      <div className='profile_img text-center p-4'>
        <EditUserPage />
      <div className="flex flex-column justify-content-center align-items-center">
   

    <Dialog
      open={open} onClose={handleToClose}
      visible={visible} 
      onHide={() => setvisible(false)} 
>
      
      <div className='confirmation-content flex flex-column align-items-center'>
         <Avatar 
         width={500}
         height={400}
         onCrop={onCrop}
         onClose={onClose}
         shadingColor={"#474649"}
         backgroundColor={"#474649"}
         />

          <div className='flex flex-column align-items-center my-5 w-12'>
            <div className='flex flex-column justify-content-around w-12 mt-4'>
            <Button
                  onClick={saveCropImage}
                  label="Save"
                  icon="pi pi-check"
                  className="buttonSave"
                  />
            </div>
         </div>
      </div>
      <DialogActions>
      <Button className="buttonClose" onClick={handleToClose}
				color="primary" autoFocus>
			close
		</Button>
      </DialogActions>
    </Dialog>
    
      </div>
    </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4 flex flex-col text-white ">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="unfollow bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10 text-white ">
                <span className="font-bold">{photosCount}</span>
                {` `}
                posts
              </p>
              <p className="mr-10 text-white">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10 text-white">
                <span className="font-bold">{following.length}</span>
                {` `}
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium flex flex-col text-white">
            {!fullName ? (
              <Skeleton height={24} />
            ) : (
              <>
                <span>{fullName}</span>
                <span className="font-normal text-gray-500">
                  {currentUser.aboutMe}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;