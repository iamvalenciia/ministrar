import { UserIcon } from "../../components/icons";
import { FormEvent } from "react";

interface LoginProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

export default function LoginForm({
  email,
  password,
  handleSubmit,
  setEmail,
  setPassword,
}: LoginProps) {
  const inputStyle =
    "w-full px-2 py-1 rounded-md focus:outline-none text-lg placeholder-gray-400";
  const inputBackground = {
    background: "rgb(112,128,144, 0.2)",
    color: "black",
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg p-6 first-letter"
        style={{
          background: "rgba(255, 255, 255)",
          border: "1px solid black",
          color: "black",
        }}
      >
        <div className="flex gap-5 items-center font-semibold">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <a href="/" className="hover:underline text-md mb-4">
            Forgot password?
          </a>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
            style={inputBackground}
            placeholder="email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyle}
            style={inputBackground}
            placeholder="password"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="rememberMe" className="block sr-only">
            Remember me
          </label>
          <input
            type="checkbox"
            id="rememberMe"
            // checked={rememberMe}
            // onChange={handleRememberMeChange}
            className="mr-2 accent-gray-900 h-4 w-4 rounded cursor-pointer"
          />
          <div className="text-lg font-semibold">Remember me</div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="flex items-center bg-gray-950  text-gray-50 font-bold py-2 px-2 rounded-md hover:bg-gray-700 hover:text-gray-50 transition-colors"
          >
            <UserIcon className="mx-2" />
            <span className="mr-2"> Sign In </span>
          </button>
        </div>
      </form>
    </div>
  );
}
