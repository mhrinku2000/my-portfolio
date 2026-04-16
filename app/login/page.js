"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError("Invalid Email or Password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-slate-100">
      <div className="max-w-md w-full bg-surface p-10 rounded-2xl border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-black mb-6 text-center text-white">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 ml-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-slate-900 border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white p-4" 
              placeholder="admin@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-900 border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white p-4" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black py-4 px-8 rounded-xl text-lg transition-all shadow-lg shadow-primary/20">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
