import {
    UserIcon,
    IconBasic_eye,
    IconBasic_eye_closed
} from '../../components/icons';
import { FormEvent } from 'react';

interface RegisterProps {
    name: string;
    username: string;
    email: string;
    password: string;
    showPassword: boolean;
    setName: (name: string) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: FormEvent) => void;
    setShowPassword: (showPassword: boolean) => void;
}

export default function Register({
    name,
    username,
    email,
    password,
    setName,
    setUsername,
    setEmail,
    setPassword,
    handleSubmit,
    showPassword,
    setShowPassword
}: RegisterProps) {
    const inputStyle =
        'w-full px-2 py-1 rounded-md focus:outline-none text-lg placeholder-gray-400';
    const inputBackground = {
        background: 'rgb(112,128,144, 0.2)',
        color: 'black'
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="rounded-lg shadow-lg p-6"
                style={{
                    background: 'rgba(255, 255, 255)',
                    border: '1px solid black',
                    color: 'black'
                }}>
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block sr-only">
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
                    <label htmlFor="emailRegister" className="block sr-only">
                        Email
                    </label>
                    <input
                        type="email"
                        id="emailRegister"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputStyle}
                        style={inputBackground}
                        placeholder="email"
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="passwordRegister" className="block sr-only">
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="passwordRegister"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-12/12 px-2 py-1 rounded-md focus:outline-none text-lg placeholder-gray-400"
                        style={inputBackground}
                        placeholder="password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="flex items-center bg-gray-950  text-gray-50 font-bold py-2 px-2 rounded-md hover:bg-gray-700 hover:text-gray-50 transition-colors">
                        <UserIcon className="mx-2" />
                        <span className="mr-2"> Sign Up </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="h-full  bg-gray-400 font-bold rounded-md p-2 text-gray-950 transition-colors transform bg-opacity-30">
                        {showPassword ? (
                            <IconBasic_eye />
                        ) : (
                            <IconBasic_eye_closed />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
