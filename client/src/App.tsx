import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

function App() {

  useEffect(() => {

    socket.on("connection", () => {
      console.log("Connected to the server");
    });

  }, []);

  return (
    <div>
      <h1>Homepage</h1>
    </div>
  );
}

export default App;
