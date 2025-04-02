import { useState, useEffect } from "react";

export default function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername("Mani Krishna");
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">SocialSync</h2>
      <div className="flex items-center space-x-4">
        <p className="text-sm">{username}</p>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400">
          Logout
        </button>
      </div>
    </div>
  );
}
