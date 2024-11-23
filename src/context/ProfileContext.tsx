import { createContext, Dispatch, SetStateAction } from "react";
import { ProfileData } from "../types";

interface ProfileContextType {
  profile: ProfileData;
  setProfile: Dispatch<SetStateAction<ProfileData>>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: { id: undefined, name: "", email: "", age: "" },
  setProfile: () => {},
});
export default ProfileContext;
