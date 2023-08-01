import { useState, FormEvent, useEffect } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import Footer from './footer';
import Header from './header';
import { useMutation, gql } from '@apollo/client';

export default function HomePage() {
    /*----------------*/
    /* REGISTER LOGIC */
    /*----------------*/
    const REGISTER_USER = gql`
        mutation RegisterUser($registerInput: RegisterInput) {
            registerUser(registerInput: $registerInput)
        }
    `;

    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        showPassword: false
    });

    const [registerUser, { loading, error, data }] = useMutation(
        REGISTER_USER,
        {
            update(client, { data: { registerUser } }) {
                client.writeQuery({
                    query: REGISTER_USER,
                    data: { registerUser }
                });
            }
        }
    );
    const handleRegisterSubmit = (e: FormEvent) => {
        e.preventDefault();
        registerUser({
            variables: {
                registerInput: {
                    name: registerForm.name,
                    userName: registerForm.username,
                    email: registerForm.email,
                    password: registerForm.password
                }
            }
        });
    };
    useEffect(() => {
        if (data) {
            setRegisterForm({
                ...registerForm,
                name: '',
                username: '',
                email: '',
                password: ''
            });
        }
    }, [data, registerForm]);

    /*--------------*/
    /* LOGIN LOGIC  */
    /*--------------*/
    const LOGIN_USER = gql`
        mutation LoginUser($loginInput: LoginUser) {
            loginUser(loginInput: $loginInput) {
                token
                userName
                name
                followingCount
                followersCount
                email
                _id
            }
        }
    `;
    const [loginEmail, setEmailLogin] = useState('');
    const [loginPassword, setPasswordLogin] = useState('');
    const [
        loginUser,
        { loading: loginLoading, error: loginError, data: loginData }
    ] = useMutation(LOGIN_USER, {
        update(client, { data: { loginUser } }) {
            client.writeQuery({
                query: LOGIN_USER,
                data: { loginUser }
            });
        }
    });
    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await loginUser({
                variables: {
                    loginInput: {
                        email: loginEmail,
                        password: loginPassword
                    }
                }
            });
        } catch (error) {
            return;
        }
    };
    useEffect(() => {
        if (loginData) {
            setEmailLogin('');
            setPasswordLogin('');
        }
    }, [loginData]);

    if (loginData && loginData.loginUser && loginData.loginUser.token) {
        localStorage.setItem('token', loginData.loginUser.token);
        window.location.reload();
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-200">
            <Header
                error={error}
                data={data}
                loading={loading}
                loginError={loginError}
                loginData={loginData}
                loginLoading={loginLoading}
            />
            <main className="container mx-auto my-auto grid gap-8 px-4 md:grid-cols-2">
                <div>
                    <RegisterForm
                        registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        handleRegisterSubmit={handleRegisterSubmit}
                    />
                </div>
                <div>
                    <LoginForm
                        email={loginEmail}
                        password={loginPassword}
                        setEmail={setEmailLogin}
                        setPassword={setPasswordLogin}
                        handleSubmit={handleLoginSubmit}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
