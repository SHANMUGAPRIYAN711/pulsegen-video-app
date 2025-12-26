import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const registerUser = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role: "viewer",        // 👈 always send role
        }),
      });

      const data = await res.json();
      alert(data.message || "Account created successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={registerUser}>
      <h2>Register</h2>

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Create Account</button>
    </form>
  );
}
