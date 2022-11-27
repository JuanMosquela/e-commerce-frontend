import { createContext, useState } from "react";
import publicRequest from "../utils/request-methods";

export const GoogleContext = createContext();

const GoogleProvider = ({ children }) => {
  const [googleUser, setGoogleUser] = useState(null);

  const handleLoginWithGoogle = async (values) => {
    console.log("llega");
    const res = await publicRequest.login(values);
    console.log(res);
    setGoogleUser(res);
  };

  console.log(googleUser);

  return (
    <GoogleContext.Provider
      value={{ handleLoginWithGoogle, googleUser, setGoogleUser }}
    >
      {children}
    </GoogleContext.Provider>
  );
};
export default GoogleProvider;
