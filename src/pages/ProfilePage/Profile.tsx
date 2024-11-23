import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { deleteProfile } from "../../api/api";
import { ProfileData } from "../../types";
import ProfileContext from "../../context/ProfileContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProfile from "../../utils/useProfile";
import emptyState from "../../assets/2953962.jpg"

const Profile = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { fetchProfileData } = useProfile();

  function createProfile() {
    console.log("profileInfo");
  }
  useEffect(() => {
    if (profile.name === "") {
      const profileData: string | null = localStorage.getItem("profileInfo");
      if (profileData) {
        const profileInfo: ProfileData = JSON.parse(profileData);
        setProfile(profileInfo);
      } else {
        fetchProfileData();
      }
    }
  }, []);

  async function handleDelete() {
    if (!profile?.id) {
      console.error("Profile ID is missing. Cannot delete.");
      return;
    }
    try{
      const res = await deleteProfile(profile.id);
      if(res) {
        toast.success("Successfully deleted Profile.", {
          position: "top-right",
        });
        localStorage.removeItem('profileInfo');
        await fetchProfileData();
      }
    } catch {
      toast.error("Failed to delete profile.", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="h-screen">
      {!profile.id ? (
        <div className="flex items-center justify-center flex-col">
          <img src={emptyState} className="h-[400px] w-[500px] mb-4" />
          <p className="text-lg mb-4">
            You don't have a profile. Start creating one now to get started!
          </p>
          <Link to="/profile-form" onClick={createProfile} className="p-2 rounded-full bg-blue-500">
            Create New Profile
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 p-10 w-[400px]">
          <div className="grid col-span-7 gap-2">
            <div className="flex font-bold">
              <span>Name:</span>
            </div>
            <div>
              <span>{profile.name}</span>
            </div>
          </div>

          <div className="grid col-span-7 gap-2">
            <div className="flex font-bold">
              <span>Email:</span>
            </div>
            <div>
              <span>{profile.email}</span>
            </div>
          </div>
          {profile.age !== '' && (
            <div className="grid col-span-7 gap-2">
              <div className="flex font-bold">
                <span>Age:</span>
              </div>
              <div>
                <span>{profile.age}</span>
              </div>
            </div>
          )}
          <div className="grid col-span-7 gap-2">
            <div className="flex items-center gap-4">
              <Link to="/profile-form" className="bg-">
                Edit
              </Link>
              <button className="bg-red-500 p-2" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
