import { useState, useEffect } from "react";

function SettingsPage({ setActiveScreen }) {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem("soundEnabled") === "true"
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    localStorage.getItem("notificationsEnabled") === "true"
  );
  const [defaultTag, setDefaultTag] = useState(
    localStorage.getItem("defaultTag") || "Focus"
  );

  useEffect(() => {
    if (notificationsEnabled && Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          setNotificationsEnabled(false);
          localStorage.setItem("notificationsEnabled", false);
        }
      });
    }
  }, [notificationsEnabled]);

  const handleSaveUsername = () => {
    localStorage.setItem("username", username.trim());
    alert("Name updated!");
  };

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      localStorage.setItem("soundEnabled", !prev);
      return !prev;
    });
  };

  const handleToggleNotifications = async () => {
    const next = !notificationsEnabled;

    if (next) {
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          alert("Notification permission denied or dismissed.");
          return;
        }
      } else if (Notification.permission === "denied") {
        alert(
          "Notifications are blocked in browser settings. Please allow manually."
        );
        return;
      }
    }

    setNotificationsEnabled(next);
    localStorage.setItem("notificationsEnabled", next);
  };

  const handleDefaultTagChange = (e) => {
    const tag = e.target.value;
    setDefaultTag(tag);
    localStorage.setItem("defaultTag", tag);
  };

  const resetAll = () => {
    if (confirm("⚠ This will clear all your data and reset the app.")) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <div className="max-w-xl w-full px-6 py-10 bg-[#1a1a1a] rounded-xl shadow-md border border-[#2a2a2a] text-white">
      <button
        onClick={() => setActiveScreen("home")}
        className="text-purple-400 hover:text-purple-300 transition text-sm mb-6"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">⚙️ Settings</h2>

      <div className="flex flex-col gap-6">
        {/* Username */}
        <div>
          <label className="block mb-1 text-sm text-gray-400">Your Name</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#111] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your name"
          />
          <button
            onClick={handleSaveUsername}
            className="mt-2 px-4 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
          >
            Save
          </button>
        </div>

        {/*Sound*/}
        <div className="flex items-center justify-between">
          <span>🔊 Enable Sound</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={handleToggleSound}
          />
        </div>

        {/*Notification*/}
        <div className="flex items-center justify-between">
          <span>🔔 Desktop Notifications</span>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggleNotifications}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-400">
            Default Session Tag
          </label>
          <select
            value={defaultTag}
            onChange={handleDefaultTagChange}
            className="w-full px-4 py-2 rounded bg-[#111] border border-gray-700"
          >
            {["Focus", "Study", "Work", "Break", "Writing"].map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={resetAll}
          className="mt-8 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
        >
          🔄 Reset App
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
