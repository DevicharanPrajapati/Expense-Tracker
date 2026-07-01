import { createContext, useContext } from "react";
import { useAuth } from "./AuthContexts";
import api from "../services/api";

const ProfileUpdateContext = createContext();

const ProfileUpdateProvider = ({ children }) => {
  const { token, setUser } = useAuth();

  const updateProfile = async (name) => {
    try {

      //profile update api call
      const response = await api.put(
        "/users/updateProfile",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

   //password update api call
   const updatePassword = async ({formdata}) => {
      try {
        const response = await api.put(
          "/users/updatePassword",
          { formdata},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Password update response:", response.data);
        console.log("Password update response message:", response.data.message);
        return response.data.message;
      } catch (error) {
        console.error(error);
        throw error;
      }
  };

  return (
    <ProfileUpdateContext.Provider value={{ updateProfile, updatePassword }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};

export { ProfileUpdateProvider };

export const useProfileUpdate = () => useContext(ProfileUpdateContext);