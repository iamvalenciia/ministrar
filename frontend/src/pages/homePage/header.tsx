import Alerts from '../../components/alerts';
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

export default function Header({
    error,
    data,
    loading,
    loginError,
    loginData,
    loginLoading
}: AlertsProps) {
    return (
        <header className="grid md:grid-cols-3 lg:grid-cols-6">
            <div className="container mx-auto px-4 pt-4 sm:col-start-3 sm:row-start-1 sm:row-end-2 md:col-end-4 md:row-start-1 md:row-end-2 lg:col-start-5 lg:col-end-7 xl:col-start-5 xl:col-end-8">
                <Alerts
                    error={error}
                    data={data}
                    loading={loading}
                    loginError={loginError}
                    loginData={loginData}
                    loginLoading={loginLoading}
                />
            </div>
            <div className="container bg-gray-200 px-4 pb-8 pt-4 text-center sm:col-start-2 sm:row-start-1 sm:row-end-2 md:col-end-3 md:row-start-1 md:row-end-2 lg:col-start-3 lg:col-end-5 xl:col-start-3 xl:col-end-5">
                <h1 className="text-4xl text-gray-800 xl:text-6xl">
                    To Minister
                </h1>
                <p className="text-xl text-gray-600">
                    A Collaborative Help Platform
                </p>
            </div>
        </header>
    );
}
