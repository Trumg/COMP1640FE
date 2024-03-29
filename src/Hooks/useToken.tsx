import { User } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useState, useEffect } from "react";

export default function useToken() {
  const [token, setToken] = useState("");
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        user
          .getIdToken(true)
          .then((latestToken) => setToken(latestToken))
          .catch((err) => console.log(err));
      }
    });
  }, []);
  return token;
}

export function useGetInfoUser() {
  const [info, setInfo] = useState<User>();
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setInfo(user);
      } else setInfo(undefined);
    });
  }, []);
  return info;
}
