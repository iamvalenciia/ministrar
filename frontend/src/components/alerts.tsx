import { useState, useEffect } from "react";
import { DeleteIcon, Loading } from "./icons";
import { ApolloError } from "@apollo/client";

interface AlertsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: ApolloError | any | unknown | undefined;
  data: unknown;
  loading: boolean;
}

const Alerts = ({ error, data, loading }: AlertsProps) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) {
      const errorMessage =
        error.networkError.result.errors[0]?.message || error.message;
      setAlertMessage(errorMessage);
      setIsError(true);
    } else if (data) {
      setAlertMessage("Registration successful! Log in to get started.");
      setIsError(false);
    }
  }, [error, data]);

  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-opacity-80 p-4 rounded-lg">
        <div className="flex">
          <Loading />
        </div>
      </div>
    );
  }

  if (alertMessage) {
    const alertClass = isError ? "bg-red-500" : "bg-green-500";

    return (
      <div
        className={`flex items-center justify-center ${alertClass} bg-opacity-80 p-4 rounded-lg`}
      >
        <div className="text-white">{alertMessage}</div>
        <button onClick={handleCloseAlert} className="ml-2 text-white">
          <DeleteIcon />
        </button>
      </div>
    );
  }

  return null;
};

export default Alerts;
