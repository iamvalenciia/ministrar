import { useState, FormEvent, useEffect } from "react";
import LoginForm from "../components/login";
import RegisterForm from "../components/register";
import backgroundImage from "../images/background9.png";
import Alerts from "../components/alerts";
import { useMutation, gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      _id
      name
      userName
      email
      password
      gender
      followersCount
      followingCount
      token
    }
  }
`;

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

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
          gender: gender,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      setName("");
      setGender("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div
        className="relative flex items-center justify-center flex-grow"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="absolute top-0 right-0 m-4">
            <Alerts error={error} data={data} loading={loading} />
          </div>

          <div className="flex flex-col md:flex-row mt-8">
            <div className="w-full md:w-1/2 mx-auto">
              <RegisterForm
                name={name}
                gender={gender}
                username={username}
                email={email}
                password={password}
                setName={setName}
                setGender={setGender}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
              />
            </div>

            <div className="w-full md:w-1/2 mx-auto mt-4 md:mt-0">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
