import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export function Home() {
  const { logout } = useLogout();
  const {user} = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to the server");
    });
  }, []);

  return (
    <div className="text-white">
      <h1>Homepage</h1>
      <button onClick={handleLogout}>Logout</button>
      {user && (
        <div>
          <p>Welcome, {user.email}!</p>
        </div>
      )}
    </div>
  );
}
