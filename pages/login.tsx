import React, { useState } from "react";
import Router from "next/router";
import { useAuth } from "../client/src/provider/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState<string>("admin@gmail.com");
  const [password, setPassword] = useState<string>("admin");
  const { signIn, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      Router.push("/");
      // window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
