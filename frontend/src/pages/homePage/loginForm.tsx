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
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg p-6 first-letter"
        style={{
          background: "rgba(244, 126, 17, 0.5)",
          border: "1px solid gray",
        }}
      >
        <div className="flex gap-5 items-center font-semibold">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <a
            href="/"
            className="text-gray-900 hover:underline hover:text-gray-50 text-md mb-4"
          >
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
            className="w-full px-3 py-2 border  rounded-md focus:outline-none text-lg"
            style={{
              background: "#EBEFF2",
              color: "black",
            }}
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
            className="w-full px-3 py-2 border rounded-md focus:outline-none text-lg"
            style={{ background: "#EBEFF2", color: "black" }}
            placeholder="password"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="rememberMe"
            // checked={rememberMe}
            // onChange={handleRememberMeChange}
            className="mr-2 form-checkbox h-5 w-5"
          />
          <label
            htmlFor="rememberMe"
            className="text-gray-900 text-lg font-semibold"
          >
            Remember me
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-#1E629C border text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-50 hover:text-gray-600 transition-colors"
          >
            <UserIcon className="hover:fill-gray-700 mx-2" />
            <span className="mr-2"> Sign In </span>
          </button>
        </div>
      </form>
    </div>
  );
}
