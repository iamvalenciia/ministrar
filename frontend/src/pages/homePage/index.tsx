import { useState, FormEvent, useEffect } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import Footer from "./footer";
// import backgroundImage from "../../images/background9-01.png";
import Alerts from "../../components/alerts";
import { useMutation, gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput)
  }
`;

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, {
    update(client, { data: { registerUser } }) {
      client.writeQuery({
        query: REGISTER_USER,
        data: { registerUser },
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    registerUser({
      variables: {
        registerInput: {
          name: name,
          userName: username,
          email: email,
          password: password,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }, [data]);

  /*LOGIN LOGIC*/
  const [loginEmail, setEmailLogin] = useState("");
  const [LoginPassword, setPasswordLogin] = useState("");
  return (
    <div
      className="flex flex-col min-h-screen bg-gray-200"
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <header className="grid lg:grid-cols-6 md:grid-cols-3">
        <div className="xl:col-start-5 xl:col-end-8 lg:col-start-5 lg:col-end-7 sm:row-start-1 sm:row-end-2 md:row-start-1 md:row-end-2 sm:col-start-3 md:col-end-4 container mx-auto px-4 pt-4">
          <Alerts error={error} data={data} loading={loading} />
        </div>
        <div className="xl:col-start-3 xl:col-end-5 lg:col-start-3 lg:col-end-5 sm:row-start-1 sm:row-end-2 md:row-start-1 md:row-end-2 sm:col-start-2 md:col-end-3 container px-4 pt-4 pb-8 text-center">
          <h1 className="text-4xl xl:text-6xl logo">To Minister</h1>
          <p className="text-xl logo-text">A Collaborative Help Platform</p>
        </div>
      </header>
      <main className="container mx-auto my-auto px-4 grid gap-8 md:grid-cols-2">
        <div>
          <RegisterForm
            name={name}
            username={username}
            email={email}
            password={password}
            setName={setName}
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        <div>
          <LoginForm
            email={loginEmail}
            password={LoginPassword}
            setEmail={setEmailLogin}
            setPassword={setPasswordLogin}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
      <footer>
        <div className="container mx-auto px-4 py-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
