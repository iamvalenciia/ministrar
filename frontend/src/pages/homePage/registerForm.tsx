import {
    UserIcon,
    IconBasic_eye,
    IconBasic_eye_closed
} from '../../components/icons';
import { FormEvent } from 'react';

interface RegisterProps {
    registerForm: {
        username: string;
        email: string;
        password: string;
        name: string;
        showPassword: boolean;
        // Add other fields if necessary
    };
    setRegisterForm: React.Dispatch<
        React.SetStateAction<{
            username: string;
            email: string;
            password: string;
            name: string;
            showPassword: boolean;
            // Add other fields if necessary
        }>
    >;
    handleRegisterSubmit: (e: FormEvent) => void;
}

export default function Register({
    registerForm,
    setRegisterForm,
    handleRegisterSubmit
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
                onSubmit={handleRegisterSubmit}
                className="rounded-lg p-6 shadow-lg"
                style={{
                    background: 'rgba(255, 255, 255)',
                    border: '1px solid black',
                    color: 'black'
                }}>
                <h2 className="mb-4 text-2xl font-bold">Register</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="sr-only block">
                        name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={registerForm.name}
                        onChange={(e) =>
                            setRegisterForm({
                                ...registerForm,
                                name: e.target.value
                            })
                        }
                        className={inputStyle}
                        style={inputBackground}
                        placeholder="name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="sr-only block">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={registerForm.username}
                        onChange={(e) =>
                            setRegisterForm({
                                ...registerForm,
                                username: e.target.value
                            })
                        }
                        className={inputStyle}
                        style={inputBackground}
                        placeholder="username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="emailRegister" className="sr-only block">
                        Email
                    </label>
                    <input
                        type="email"
                        id="emailRegister"
                        value={registerForm.email}
                        onChange={(e) =>
                            setRegisterForm({
                                ...registerForm,
                                email: e.target.value
                            })
                        }
                        className={inputStyle}
                        style={inputBackground}
                        placeholder="email"
                        required
                    />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="passwordRegister" className="sr-only block">
                        Password
                    </label>
                    <input
                        type={registerForm.showPassword ? 'text' : 'password'}
                        id="passwordRegister"
                        value={registerForm.password}
                        onChange={(e) =>
                            setRegisterForm({
                                ...registerForm,
                                password: e.target.value
                            })
                        }
                        className="w-12/12 rounded-md px-2 py-1 text-lg placeholder-gray-400 focus:outline-none"
                        style={inputBackground}
                        placeholder="password"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="flex items-center rounded-md  bg-gray-950 px-2 py-2 font-bold text-gray-50 transition-colors hover:bg-gray-700 hover:text-gray-50">
                        <UserIcon className="mx-2" />
                        <span className="mr-2"> Sign Up </span>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setRegisterForm({
                                ...registerForm,
                                showPassword: !registerForm.showPassword
                            })
                        }
                        className="h-full  transform rounded-md bg-gray-400 bg-opacity-30 p-2 font-bold text-gray-950 transition-colors">
                        {registerForm.showPassword ? (
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
