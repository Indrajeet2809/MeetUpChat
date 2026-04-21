import { useEffect, useState } from "react";
import API from "../api/axios";

const Home = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const res = await API.get("/");
        setMessage(res.data.message);
      } catch (error) {
        setMessage("Failed to connect backend");
        console.error(error);
      }
    };

    fetchBackend();
  }, []);

  return (
    <div>
      <h1>Welcome to MeetUpChat</h1>
      <p>{message}</p>
    </div>
  );
};

export default Home;