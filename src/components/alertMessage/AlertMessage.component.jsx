import { useEffect, useState } from "react";

const AlertMessage = ({ message }) => {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return alert && <div>{message}</div>;
};

export default AlertMessage;
