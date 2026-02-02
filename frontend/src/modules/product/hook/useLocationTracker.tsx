import axios from "axios";
import { useEffect, useState } from "react";

const LOCATION_STORAGE_KEY = "user-location";
const LOCATION_EXPIRE_TIME = 20;

const getLocationStore = () => {
  const locationStore = localStorage.getItem(LOCATION_STORAGE_KEY);
  if (!locationStore) {
    return null;
  }
  const location = JSON.parse(locationStore);
  const expireTime = LOCATION_EXPIRE_TIME * 24 * 60 * 60 * 1000;
  const isExpired = Date.now() - location.expireTime > expireTime;

  if (isExpired) {
    localStorage.removeItem(LOCATION_STORAGE_KEY);
    return null;
  }
  return location;
};

export const useLocationTracker = () => {
  const [location, setLocation] = useState<{
    contry: string;
    city: string;
  } | null>(getLocationStore());

  const fetchLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const data = await response.data;
      setLocation({ contry: data.country, city: data.city });
      localStorage.setItem(
        LOCATION_STORAGE_KEY,
        JSON.stringify({
          contry: data.country,
          city: data.city,
          expireTime: Date.now(),
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location) return;
    fetchLocation();
  }, []);

  return location;
};
