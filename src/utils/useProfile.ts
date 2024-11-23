import { useContext } from 'react';
import { toast } from 'react-toastify';
import { ProfileData } from '../types';
import { fetchProfile } from '../api/api';
import ProfileContext from '../context/ProfileContext';

const useProfile = () => {
  const {setProfile} = useContext(ProfileContext);
  const fetchProfileData = async () => {
    try {
      const profileData: ProfileData = await fetchProfile();
      if(!profileData) {
        setProfile({ id: null, name: "", email: "", age: "" });
      } else {
        setProfile(profileData);
        localStorage.setItem("profileInfo", JSON.stringify(profileData));
      }
    } catch (error) {
      toast.error("Failed to fetch profile info.", {
        position: "top-right",
      });
    }
  };

  return { fetchProfileData };
};

export default useProfile;