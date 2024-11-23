import React, { useCallback, useContext, useEffect, useState } from "react";
import { saveProfile, updateProfile } from "../../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileData } from "../../types";
import ProfileContext from "../../context/ProfileContext";
import useProfile from "../../utils/useProfile";
import { useNavigate } from "react-router-dom";

type errors = {
  name: string;
  email: string;
  age: string;
};
const ProfileForm = () => {
  const [formData, setFormData] = useState<ProfileData>({
    id: undefined,
    name: "",
    email: "",
    age: "",
  });
  const [errors, setErrors] = useState<errors>({
    name: "",
    email: "",
    age: "",
  });
  const { fetchProfileData } = useProfile();
  const navigate = useNavigate();
  const { profile } = useContext(ProfileContext);

  useEffect(() => {
    setFormData(profile);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    let newErrors: errors = errors;
    if (name === "name" && value.trim().length >= 3) newErrors.name = "";
    if (name === "email" && /\S+@\S+\.\S+/.test(value.trim()))
      newErrors.email = "";
    if (name === "age") {
      const ageNum = Number(formData.age);
      if (value.trim() === "" || (Number.isInteger(ageNum) && ageNum > 0)) {
        newErrors.age = "";
      }
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors: errors = { name: "", email: "", age: "" };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Age validation (optional but must be valid if provided)
    if (formData.age.trim() !== "") {
      const ageNum = Number(formData.age);
      console.log(ageNum, "ageNum");
      if (isNaN(ageNum) || ageNum <= 0 || !Number.isInteger(ageNum)) {
        newErrors.age = "Age must be a valid integer greater than 0";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (validateForm()) {
        try {
          let res;
          if (!formData.id) {
            const profileInfo = {
              name: formData.name,
              email: formData.email,
              age: formData.age,
            };
            res = await saveProfile(profileInfo);
          } else {
            res = await updateProfile(formData);
          }
          if (res) {
            toast.success(
              formData.id
                ? "Successfully updated Profile."
                : "Successfully created Profile.",
              {
                position: "top-right",
              }
            );
            console.log(formData.id, 'formData.id');
            await fetchProfileData();
            navigate("/profile");
          } else {
            toast.error(
              formData.id
                ? "Failed to update profile."
                : "Failed to create profile.",
              {
                position: "top-right",
              }
            );
          }
        } catch (error) {
          toast.error("An error occurred while saving the profile.", {
            position: "top-right",
          });
        }
      }
    },
    [formData]
  );

  return (
    <div className="h-screen p-10">
      <h1 className="text-xl font-bold mb-6">Create Profile</h1>

      <div className="w-1/2">
        <form className="flex flex-col gap-4" onSubmit={handleCreate}>
          <div>
            <input
              type="text"
              placeholder="Name"
              className={`px-4 border w-full outline-none py-2 ${
                errors.name ? "border-red-500" : "border-gray-500"
              }`}
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`px-4 border w-full outline-none py-2 ${
                errors.email ? "border-red-500" : "border-gray-500"
              }`}
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Age (Optional)"
              className={`px-4 border w-full outline-none py-2 ${
                errors.age ? "border-red-500" : "border-gray-500"
              }`}
              value={formData.age}
              name="age"
              onChange={handleChange}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="float-right rounded-md bg-[#3ea6ff] p-2 text-black text-md font-medium"
            >
              {formData.id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
