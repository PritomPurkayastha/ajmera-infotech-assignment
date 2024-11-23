import { ProfileData } from "../types";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL_DEV
    : import.meta.env.VITE_API_BASE_URL_PROD;

export const fetchProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const saveProfile = async (profile: ProfileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      console.error("Failed to save profile:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (profile: ProfileData) => {
  if (!profile.id) {
    console.error('Cannot update profile: No ID provided');
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${profile.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      console.error('Update failed:', response.status, response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

export const deleteProfile = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete profile");
    return true;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};
