import { UserIcon } from "../../components/icons";
import { FormEvent } from "react";

interface RegisterProps {
  name: string;
  gender: string;
  username: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setGender: (gender: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

export default function Register({
  name,
  gender,
  username,
  email,
  password,
  setName,
  setGender,
  setUsername,
  setEmail,
  setPassword,
  handleSubmit,
}: RegisterProps) {
  const inputStyle =
    "w-full px-2 py-1 rounded-md focus:outline-none text-lg placeholder-gray-800";
  const inputBackground = {
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-lg p-6"
        style={{
          background: "rgba(25, 99, 148, 0.9)",
          color: "white",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block sr-only">
            name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            style={inputBackground}
            placeholder="name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block sr-only">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={inputStyle}
            style={inputBackground}
            placeholder="gender"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block sr-only">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputStyle}
            style={inputBackground}
            placeholder="username"
            required
          />
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="flex items-center bg-#1E629C border text-yellow-50 font-bold py-2 px-2 rounded-md hover:bg-yellow-50 hover:text-gray-700 transition-colors"
          >
            <UserIcon className="hover:fill-gray-700 mx-2" />
            <span className="mr-2"> Sign Up </span>
          </button>
        </div>
      </form>
    </div>
  );
}
