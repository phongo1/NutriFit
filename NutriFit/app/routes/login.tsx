import { useState } from "react";
import NavBar from "~/components/navBar";
import { useAccount } from "../persistence/accountContext";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const { setAccount } = useAccount();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignupClick = () => {
    navigate("/signup");
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill out both email and password.");
      return;
    }

    try {
      setError(null); // clear previous error
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      setAccount(data);
      navigate("/searchItem")
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col w-screen h-screen py-[4rem] px-[25rem]">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mt-[2rem]">Login</h1>
        <p className="text-2xl font-medium text-[#ACACAC] mt-1">Please sign in to continue.</p>

        <form
          className="flex flex-col gap-5 mt-[2rem]"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-[var(--color-accent)] text-white font-bold self-end w-[7rem] py-2 px-4 rounded hover:scale-101 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="text-xl self-center mt-[6rem] flex gap-2">
          <p className="text-[#ACACAC] font-medium">Don’t have an account? </p>
          <p className="text-[var(--color-accent)] font-medium cursor-pointer" onClick={handleSignupClick}>Sign up here</p>
        </p>
      </div>
    </div>
  );
}
