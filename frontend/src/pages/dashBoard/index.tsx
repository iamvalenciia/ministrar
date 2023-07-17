import { useMutation, gql } from '@apollo/client';

const LOGOUT = gql`
    mutation Logout {
        logOut
    }
`;

export default function DashBoard() {
    const [logoutMutation, { loading, error }] = useMutation(LOGOUT);

    const handleLogout = async () => {
        try {
            await logoutMutation();
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error('Logout error:', error);
        // You can handle the error here or display an error message
    }

    return (
        <div className="bg-yellow-400">
            <h1>This is the dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
