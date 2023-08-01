import { useState, useEffect } from 'react';
import { DeleteIcon, LoadingIcon } from './icons';
import { ApolloError } from '@apollo/client';

interface AlertsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: ApolloError | any | unknown | undefined;
    data: { registerUser: boolean } | unknown;
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loginError: ApolloError | any | unknown | undefined; // Add this prop
    loginData: { registerUser: boolean } | unknown;
    loginLoading: boolean;
}

interface LoginUser {
    token: string;
    userName: string;
    name: string;
    followingCount: number;
    followersCount: number;
    email: string;
    _id: string;
}

const Alerts = ({
    error,
    data,
    loading,
    loginError,
    loginData,
    loginLoading
}: AlertsProps) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (error) {
            const errorMessage =
                error.networkError.result.errors[0]?.message || error.message;
            setAlertMessage(errorMessage);
            setIsError(true);
        } else if ((data as { registerUser: boolean })?.registerUser) {
            setAlertMessage('Registration successful! Log in to get started.');
            setIsError(false);
        } else if (loginError) {
            const loginErrorMessage =
                loginError.networkError?.result.errors[0]?.message ||
                loginError.message;
            setAlertMessage(loginErrorMessage);
            setIsError(true);
        } else if ((loginData as { loginUser: LoginUser })?.loginUser?.token) {
            setAlertMessage('Login successful!');
            setIsError(false);
        }
    }, [error, data, loginError, loginData]);

    const handleCloseAlert = () => {
        setAlertMessage('');
    };

    if (loading || loginLoading) {
        return (
            <div className="flex items-end justify-end rounded-lg bg-opacity-80 p-4">
                <div className="flex">
                    <LoadingIcon size={50} />
                </div>
            </div>
        );
    }

    if (alertMessage) {
        const alertClass = isError ? 'bg-gray-400' : 'bg-gray-400';

        return (
            <div
                className={`flex items-center justify-center ${alertClass} rounded-lg bg-opacity-90 p-4`}>
                <div className="text-white">{alertMessage}</div>
                <button onClick={handleCloseAlert} className="ml-2 text-white">
                    <DeleteIcon />
                    <span className="sr-only mr-2">Delete Button</span>
                </button>
            </div>
        );
    }

    return null;
};

export default Alerts;
