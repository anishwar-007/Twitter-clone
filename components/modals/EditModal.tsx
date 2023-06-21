import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();
    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');

    useEffect(() => {
        setName(currentUser?.name || '');
        setUsername(currentUser?.username || '');
        setBio(currentUser?.bio || '');
        setProfileImage(currentUser?.profileImage || '');
        setCoverImage(currentUser?.coverImage || '');
    }, [  currentUser?.name,
          currentUser?.username,
          currentUser?.bio, 
          currentUser?.profileImage, 
          currentUser?.coverImage
        ])

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
        mutateFetchedUser();

        toast.success("Profile updated successfully")
        
        editModal.onClose();
        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    },[bio, coverImage, editModal, mutateFetchedUser, name, profileImage, username])  

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
            value={profileImage}
            disabled={isLoading}
            onChange={(image) => setProfileImage(image)}
            label="Upload profile Image"
            />
            <ImageUpload
            value={coverImage}
            disabled={isLoading}
            onChange={(image) => setCoverImage(image)}
            label="Upload cover Image"
            />
            <Input
                placeholder="Name"
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder="Username"
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                placeholder="Bio"
                value={bio}
                disabled={isLoading}
                onChange={(e) => setBio(e.target.value)}
            />
        </div>
    )

    return ( 
      <Modal 
        disabled={isLoading}
        isOpen={editModal.isOpen}
        title="Edit your profile"
        actionLabel="Save"
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
      />
     );
}
 
export default EditModal;