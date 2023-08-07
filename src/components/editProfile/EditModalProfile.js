import React, {useState} from 'react';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from '../../LIB/firebase';
import { updateAvatarUser } from '../../Services/firebase';
import { updateProfile } from 'firebase/auth';
import Avatar from 'react-avatar-edit';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Button } from 'primereact/button';
import '../profile/profile.css';

const EditModalProfile = ({ modalOpen ,setModalOpen, avatarSrc, openInput, userId }) => {

    const [imagecrop, setimagecrop] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [visible, setvisible] = useState(false); //dialogs
    const [pview, setpiew] = useState(false); //imgCrop
    const [profile, setProfile] = useState([]) //store


    const handleClickToOpen = () => {
        setOpen(true);
     };
    
     const handleToClose = () => {
        setOpen(false);
     };

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

    const deleteAvatar = async () => {
        const storageRef = storage.refFromURL(avatarSrc);
        const fullPath = storageRef.fullPath;

        const storageImage = getStorage();
        const desertRef = ref(storageImage, fullPath);

        deleteObject(desertRef).then(() => {
            alert("Success!");
        }).catch((error) => {
            alert(error.message);
        });

        const avatar = await updateAvatarUser("/Profile-Icon-SVG-09856789.png", userId);
        setModalOpen(false);
        updateProfile();
    }

    if(!modalOpen) return;

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-4xl">
                    <div className="background border-0 rounded-lg shadow-2xl relative p-10 flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between px-20 py-8  border-b border-solid border-white rounded-t">
                            <h2 className="text-xl font-bold text-white">
                            Update profile Photo
                            </h2>
                        </div>
                        <div className="flex flex-col p-8 ">
                            <div className="uploadPhoto flex justify-center px-4 py-2 text-blue-500   font-bold border">
                                <button
                                    onClick={openInput}
                                >
                                    <h1 className='updateH'>
                                    Changed User Photo
                                    </h1>
                                </button>
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
                            <div className="uploadPhoto text-red-500 font-semibold flex justify-center mt-2 px-4 py-2 border">
                                <button
                                    onClick={deleteAvatar}
                                >
                                    <h1 className='updateH'>
                                    Delete User Photo
                                    </h1>
                                </button>
                            </div>
                            <div className="uploadPhoto  mt-2">
                                <button className=''
                                    onClick={() => setModalOpen(false)}
                                >
                                   
                                    Cancel
                                    
                                </button>
                            </div>
                            <div className="flex items-start justify-between  py-3  border-b border-solid border-white rounded-t">
                          
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default EditModalProfile;
