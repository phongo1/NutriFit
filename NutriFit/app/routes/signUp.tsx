import { useState } from "react";
import NavBar from "~/components/navBar";
import { useAccount } from "../persistence/accountContext";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();
  const { setAccount } = useAccount();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !goal) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError(null);
        console.log('GOAL:', goal)
      const res = await fetch("http://localhost:3636/api/user/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          lastName : 'Lam',
          username: email,
          password: password,
          fitnessGoal: goal,
        }),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }
      console.log('SUCCESS RES:', res)
      const data = await res.json();
      setAccount(data); // Save to context
      navigate("/searchItem");
    } catch (err) {
        console.log('ERROR:', err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col w-screen h-screen py-[4rem] px-[25rem]">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Create an Account
        </h1>
        <p className="text-2xl font-medium text-[#ACACAC] mt-1">
          Please enter the following information to get started.
        </p>

        <form
          className="flex flex-col gap-6 mt-[2rem]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
            required
          />
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value.toLowerCase())}
            className={`border border-gray-300 rounded-md p-2 ${!goal ? "text-[#ACACAC]" : ""}`}
            required
          >
            <option value="" disabled>
              (Select nutritional goal)
            </option>
            <option value="bulking">Bulking</option>
            <option value="cutting">Cutting</option>
            <option value="keto">Keto</option>
            <option value="diabetic">Diabetic</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-[var(--color-accent)] text-white font-bold self-end w-[7rem] py-2 px-4 rounded hover:scale-101 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p onClick={() => {navigate("/login")}} className='text-[var(--color-accent)] cursor-pointer self-center font-medium text-xl'>Back to Login</p>

      </div>
    </div>
  );
}
