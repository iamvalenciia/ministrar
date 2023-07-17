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
        <header className="grid lg:grid-cols-6 md:grid-cols-3">
            <div className="xl:col-start-5 xl:col-end-8 lg:col-start-5 lg:col-end-7 sm:row-start-1 sm:row-end-2 md:row-start-1 md:row-end-2 sm:col-start-3 md:col-end-4 container mx-auto px-4 pt-4">
                <Alerts
                    error={error}
                    data={data}
                    loading={loading}
                    loginError={loginError}
                    loginData={loginData}
                    loginLoading={loginLoading}
                />
            </div>
            <div className="xl:col-start-3 xl:col-end-5 lg:col-start-3 lg:col-end-5 sm:row-start-1 sm:row-end-2 md:row-start-1 md:row-end-2 sm:col-start-2 md:col-end-3 container px-4 pt-4 pb-8 text-center bg-gray-200">
                <h1 className="text-4xl xl:text-6xl text-gray-800">
                    To Minister
                </h1>
                <p className="text-xl text-gray-600">
                    A Collaborative Help Platform
                </p>
            </div>
        </header>
    );
}
