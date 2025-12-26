import { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const { token, logout } = useAuth();

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/health");
        const data = await res.json();

        setBackendStatus(
          data.status === "ok"
            ? "Backend reachable ✔️"
            : "Backend not reachable ❌"
        );
      } catch (err) {
        setBackendStatus("Backend not reachable ❌");
      }
    };

    checkBackend();
  }, []);

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
      }}
    >
      <h1
        style={{
          background: "#0b56c2",
          display: "inline-block",
          padding: "1rem 2rem",
        }}
      >
        PulseGen Video App
      </h1>

      <div style={{ marginTop: "1.5rem" }}>
        <span style={{ background: "#0b56c2", padding: "0.6rem 1rem" }}>
          {backendStatus}
        </span>
      </div>

      <hr style={{ margin: "2rem 0", opacity: 0.3 }} />

      {!token ? (
        <div style={{ display: "flex", gap: "2rem" }}>
          <Register />
          <Login />
        </div>
      ) : (
        <div>
          <h3>Logged in 🎉</h3>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
